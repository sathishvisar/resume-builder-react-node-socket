import { chromium } from "playwright";
import { fromBuffer } from 'pdf2pic';


export async function BuildResume (data: any) {
    try{
        const template = `
        <div
            class="w-[794px] h-[1123px] bg-white p-8 font-source-sans-pro"
            id="resume-preview"
            ref={previewRef}
        >
            <header class="mb-1">
            <h2 class="text-[32px] uppercase font-semibold">
                ${data?.personal?.firstName} ${data?.personal?.lastName}
            </h2>
            </header>
            <section class="grid grid-cols-12">
            <div class="col-span-9 pr-3">
                <div class="profile mb-8">
                    <h3 class="resume-heading-2">Profile</h3>
                    <div class="resume-content">${data?.summary?.text}</div>
                </div>

                <div class="employement-history">
                    <h3 class="resume-heading-2">Employement History</h3>
                     <div>
                        ${(Array.isArray(data?.employments) ? data.employments : [])
                            .map((item: any) => {
                            const startDate = item?.start
                                ? new Date(item.start).toLocaleDateString()
                                : "";
                            const endDate = item?.end
                                ? new Date(item.end).toLocaleDateString()
                                : new Date().toLocaleDateString();

                            return `
                                <div class="mb-4">
                                <div>
                                    <h3 class="resume-heading-3">${item?.employer || ""}</h3>
                                    <h5 class="resume-heading-3">${item?.city || ""}</h5>
                                    <h6 class="resume-date-time">
                                    ${startDate} - ${endDate}
                                    </h6>
                                </div>
                                <div class="resume-content">
                                    ${item?.description}
                                </div>
                                </div>
                            `;
                            })
                            .join("")}
                        </div>
                </div>

                <div class="education">
                    <h3 class="resume-heading-2">Education</h3>
                    <div>
                    ${(Array.isArray(data?.educations) ? data.educations : [])
                        .map((item: any) => {
                        const startDate = item?.start
                            ? new Date(item.start).toLocaleDateString()
                            : '';
                        const endDate = item?.end
                            ? new Date(item.end).toLocaleDateString()
                            : new Date().toLocaleDateString();

                        return `
                            <div class="mb-4">
                            <div>
                                <h3 class="resume-heading-3">
                                ${item?.title || ''} ${item?.school || ''} ${item?.city || ''}
                                </h3>
                                <h6 class="resume-date-time">
                                ${startDate} - ${endDate}
                                </h6>
                            </div>
                            </div>
                        `;
                        })
                        .join("")}
                    </div>
                </div>

                <div class="projects">
                    <h3 class="resume-heading-2">Projects</h3>
                    <div>
                    ${(Array.isArray(data?.projects) ? data.projects : [])
                        .map((item: any) => {
                        const startDate = item?.start
                            ? new Date(item.start).toLocaleDateString()
                            : '';
                        const endDate = item?.end
                            ? new Date(item.end).toLocaleDateString()
                            : new Date().toLocaleDateString();
                        return `
                            <div class="mb-4">
                            <div>
                                <h3 class="resume-heading-3">
                                ${item?.project || ''} ${item?.employer || ''} ${item?.city || ''}
                                </h3>
                                <h6 class="resume-date-time">
                                ${startDate} - ${endDate}
                                </h6>
                            </div>
                            </div>
                        `;
                        })
                        .join("")
                    }
                    </div>
                </div>
            </div>
            <div class="col-span-3 flex flex-col gap-y-4 break-all">
                <div class="flex flex-col">
                <h6 class="text-normal resume-heading-3">Details</h6>
                <div class="flex flex-col gap-1 resume-sidebar-content">
                    <span>${data?.personal?.cityState}</span>
                    <span>${data?.personal?.country}</span>
                    <span>${data?.personal?.phone}</span>
                    <span>${data?.personal?.email}</span>
                </div>
                </div>
                <div class="flex flex-col">
                <h6 class="font-normal resume-heading-3">Links</h6>
                <div class="flex flex-col gap-1 resume-sidebar-content">
                     ${(Array.isArray(data?.links) ? data.links : [])
                        .map((item: any) => `<span>${item?.link}</span>`)
                        .join("")
                    }
                </div>
                </div>
                <div class="flex flex-col">
                <h6 class="text-normal resume-heading-3">Skills</h6>
                <div class="flex flex-col gap-1 resume-sidebar-content">
                    ${(Array.isArray(data?.skills) ? data.skills : [])
                        .map((item: any) => `<span>${item?.skill}</span>`)
                        .join("")
                    }
                </div>
                </div>
            </div>
            </section>
        </div>
        `
        const pdfBlob = await BuildPdf(template)
        return pdfBlob
    }catch(e){
        throw e
    }
} 


async function BuildPdf(template: any) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const html = `
      <!DOCTYPE html>
      <html><head>
        <meta charset="UTF-8">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Reem+Kufi+Fun:wght@400..700&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
      </head>
      <body class="p-10">
        ${template}
      </body>
      <style>
     ul {
  list-style-type: disc;
  padding-left: 1.5rem; /* equivalent to pl-6 */
  margin-bottom: 0.5rem;
}

ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
}

li {
  margin-bottom: 0.25rem;
  color: #1e2532; /* your desired text color */
}

      .font-source-sans-pro {
        font-family: "Source Sans 3", sans-serif;
      }

    .resume-heading-2 {
        font-weight: 600;
        font-size: 18px;
    }

    .resume-heading-3 {
        font-weight: 600;
        font-size: 14.66px;
    }

    .resume-date-time {
        font-size: 12px;
        color: rgb(130, 139, 162);
    }

    .resume-content {
        font-size: 14px;
    }

    .resume-sidebar-content {
        font-size: 13.33px;
    }
      </style>
      </html>`;
    console.log(html)
    await page.setContent(html, { waitUntil: "networkidle" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();
    return pdfBuffer
}


export async function generatePreviewFromBuffer(pdfBuffer: Buffer) {
    try{
        const convert = fromBuffer(pdfBuffer, {
            density: 150,
            format: 'png',
            width: 800,
            height: 1100,
            saveFilename: 'preview',
            savePath: './',
        });

        const page1 = await convert(1);
        return page1.path
    }catch(e){
        console.log(e)
        return ""
    }
}

/**
 *       @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap');
 */