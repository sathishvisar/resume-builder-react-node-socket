import { chromium } from "playwright";
import { fromBuffer } from "pdf2pic";

// Interfaces
interface ResumeData {
  personal: {
    firstName: string;
    lastName: string;
    cityState: string;
    country: string;
    phone: string;
    email: string;
  };
  summary: { text: string };
  employments: Employment[];
  educations: Education[];
  projects: Project[];
  links: { link: string }[];
  skills: { skill: string }[];
}

interface Employment {
  employer?: string;
  city?: string;
  start?: string;
  end?: string;
  description?: string;
}

interface Education {
  title?: string;
  school?: string;
  city?: string;
  start?: string;
  end?: string;
}

interface Project {
  project?: string;
  employer?: string;
  city?: string;
  start?: string;
  end?: string;
}

// === SINGLE RESPONSIBILITY ===

export async function BuildResume(data: ResumeData): Promise<Buffer> {
  try {
    const template = generateResumeTemplate(data);
    const pdfBlob = await buildPdfFromHtml(template);
    return pdfBlob;
  } catch (err) {
    console.error("BuildResume error:", err);
    throw err;
  }
}

export async function generatePreviewFromBuffer(pdfBuffer: Buffer): Promise<string> {
  try {
    const convert = fromBuffer(pdfBuffer, {
      density: 150,
      format: "png",
      width: 800,
      height: 1100,
      saveFilename: "preview",
      savePath: "./",
    });

    const page1 = await convert(1);
    return page1.path ?? "";
  } catch (e) {
    console.error("generatePreviewFromBuffer error:", e);
    return "";
  }
}

// === HTML GENERATION LAYER ===

function generateResumeTemplate(data: ResumeData): string {
  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString();

  const generateList = (items: any[], callback: (item: any) => string) =>
    items.map(callback).join("");

  const employments = generateList(data.employments || [], (item) => `
    <div class="mb-4">
      <div>
        <h3 class="resume-heading-3">${item?.employer || ""}</h3>
        <h5 class="resume-heading-3">${item?.city || ""}</h5>
        <h6 class="resume-date-time">${formatDate(item?.start)} - ${formatDate(item?.end)}</h6>
      </div>
      <div class="resume-content">${item?.description || ""}</div>
    </div>
  `);

  const educations = generateList(data.educations || [], (item) => `
    <div class="mb-4">
      <div>
        <h3 class="resume-heading-3">${item?.title || ""} ${item?.school || ""} ${item?.city || ""}</h3>
        <h6 class="resume-date-time">${formatDate(item?.start)} - ${formatDate(item?.end)}</h6>
      </div>
    </div>
  `);

  const projects = generateList(data.projects || [], (item) => `
    <div class="mb-4">
      <div>
        <h3 class="resume-heading-3">${item?.project || ""} ${item?.employer || ""} ${item?.city || ""}</h3>
        <h6 class="resume-date-time">${formatDate(item?.start)} - ${formatDate(item?.end)}</h6>
      </div>
    </div>
  `);

  const links = generateList(data.links || [], (item) => `<span>${item?.link}</span>`);
  const skills = generateList(data.skills || [], (item) => `<span>${item?.skill}</span>`);

  return `
    <div class="w-[794px] h-[1123px] bg-white p-8 font-source-sans-pro" id="resume-preview">
      <header class="mb-1">
        <h2 class="text-[32px] uppercase font-semibold">${data.personal.firstName} ${data.personal.lastName}</h2>
      </header>
      <section class="grid grid-cols-12">
        <div class="col-span-9 pr-3">
          <div class="profile mb-8">
            <h3 class="resume-heading-2">Profile</h3>
            <div class="resume-content">${data.summary.text}</div>
          </div>
          <div class="employement-history">
            <h3 class="resume-heading-2">Employment History</h3>
            <div>${employments}</div>
          </div>
          <div class="education">
            <h3 class="resume-heading-2">Education</h3>
            <div>${educations}</div>
          </div>
          <div class="projects">
            <h3 class="resume-heading-2">Projects</h3>
            <div>${projects}</div>
          </div>
        </div>
        <div class="col-span-3 flex flex-col gap-y-4 break-all">
          <div class="flex flex-col">
            <h6 class="text-normal resume-heading-3">Details</h6>
            <div class="flex flex-col gap-1 resume-sidebar-content">
              <span>${data.personal.cityState}</span>
              <span>${data.personal.country}</span>
              <span>${data.personal.phone}</span>
              <span>${data.personal.email}</span>
            </div>
          </div>
          <div class="flex flex-col">
            <h6 class="font-normal resume-heading-3">Links</h6>
            <div class="flex flex-col gap-1 resume-sidebar-content">${links}</div>
          </div>
          <div class="flex flex-col">
            <h6 class="text-normal resume-heading-3">Skills</h6>
            <div class="flex flex-col gap-1 resume-sidebar-content">${skills}</div>
          </div>
        </div>
      </section>
    </div>
  `;
}

// === HTML TO PDF RENDERING ===

async function buildPdfFromHtml(htmlBody: string): Promise<Buffer> {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const fullHtml = `
    <!DOCTYPE html>
    <html><head>
      <meta charset="UTF-8">
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
    </head>
    <body class="p-10">${htmlBody}</body>
    <style>
      ul, ol {
        padding-left: 1.5rem;
        margin-bottom: 0.5rem;
      }
      ul { list-style-type: disc; }
      ol { list-style-type: decimal; }
      li { margin-bottom: 0.25rem; color: #1e2532; }
      .font-source-sans-pro { font-family: "Source Sans 3", sans-serif; }
      .resume-heading-2 { font-weight: 600; font-size: 18px; }
      .resume-heading-3 { font-weight: 600; font-size: 14.66px; }
      .resume-date-time { font-size: 12px; color: rgb(130, 139, 162); }
      .resume-content { font-size: 14px; }
      .resume-sidebar-content { font-size: 13.33px; }
    </style>
    </html>`;

  await page.setContent(fullHtml, { waitUntil: "networkidle" });
  const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
  await browser.close();
  return pdfBuffer;
}
