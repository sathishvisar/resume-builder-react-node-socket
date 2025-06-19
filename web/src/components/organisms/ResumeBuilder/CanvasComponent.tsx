import React, { useRef, useState } from "react";
import DOMPurify from 'dompurify';
import { useHtml2Pdf } from "@/hooks/useHtml2Pdf";
import './style.css'

type Msg = { text: string; ts: string };


interface Props {
  data: any;
}

const CanvasComponent: React.FC<Props> = ({ data }) => {
  const exportPdf = useHtml2Pdf();
  const previewRef = useRef<HTMLDivElement>(null);

  const renderHtml = (raw: string) => {
    if(!raw) return
    return(<div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(raw)}}
    />)
  };

  return (
    <>
      <div
        className="w-[794px] h-[1123px] bg-white p-8 font-source-sans-pro"
        id="resume-preview"
        ref={previewRef}
      >
        {/* Header */}
        <header className="mb-1">
          <h2 className="text-[32px] uppercase font-semibold">
            {data?.personal?.firstName} {data?.personal?.lastName}
          </h2>
        </header>
        <section className="grid grid-cols-12">
          <div className="col-span-9 pr-3">
            {/* profile summary */}
            <div className="profile mb-8">
              <h3 className="resume-heading-2">Profile</h3>
              {/* <div className="resume-content">{data?.summary?.text}</div> */}
              <div className="resume-content">{renderHtml(data?.summary?.text)}</div>
            </div>

            {/* employement history */}
            <div className="employement-history">
              <h3 className="resume-heading-2">Employement History</h3>
              <div>
                {data?.employments?.map((item: any, i: number) => {
                  return (
                    <div key={i} className="mb-4">
                      <div>
                        <h3 className="resume-heading-3">{item?.employer}</h3>
                        <h5 className="resume-heading-3">{item?.city}</h5>
                        <h6 className="resume-date-time">
                          {new Date(item?.start).toLocaleDateString()} -{" "}
                          {item?.end
                            ? new Date(item.end).toLocaleDateString()
                            : new Date().toLocaleDateString()}
                        </h6>
                      </div>
                      <div className="resume-content">{renderHtml(item?.description)}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* education */}
            <div className="education">
              <h3 className="resume-heading-2">Education</h3>
              <div>
                {data?.educations?.map((item: any, i: number) => {
                  return (
                    <div key={i} className="mb-4">
                      <div>
                        <h3 className="resume-heading-3">
                          {item?.title} {item?.school} {item?.city}
                        </h3>
                        <h6 className="resume-date-time">
                          {new Date(item?.start).toLocaleDateString()} -{" "}
                          {item?.end
                            ? new Date(item.end).toLocaleDateString()
                            : new Date().toLocaleDateString()}
                        </h6>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* projects */}
            <div className="projects">
              <h3 className="resume-heading-2">Projects</h3>
              <div>
                {data?.projects?.map((item: any, i: number) => {
                  return (
                    <div key={i} className="mb-4">
                      <div>
                        <h3 className="resume-heading-3">
                          {item?.project} {item?.employer} {item?.city}
                        </h3>
                        <h6 className="resume-date-time">
                          {new Date(item?.start).toLocaleDateString()} -{" "}
                          {item?.end
                            ? new Date(item.end).toLocaleDateString()
                            : new Date().toLocaleDateString()}
                        </h6>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-span-3 flex flex-col gap-y-4 break-all">
            <div className="flex flex-col">
              <h6 className="text-normal resume-heading-3">Details</h6>
              <div className="flex flex-col gap-1 resume-sidebar-content">
                <span>{data?.personal.cityState}</span>
                <span>{data?.personal.country}</span>
                <span>{data?.personal.phone}</span>
                <span>{data?.personal.email}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <h6 className="font-normal resume-heading-3">Links</h6>
              <div className="flex flex-col gap-1 resume-sidebar-content">
                {data?.links?.map((link: string) => {
                  return <span key={link}>{link}</span>;
                })}
              </div>
            </div>
            <div className="flex flex-col">
              <h6 className="text-normal resume-heading-3">Skills</h6>
              <div className="flex flex-col gap-1 resume-sidebar-content">
                {data?.skills?.map((skill: string) => {
                  return <span key={skill}>{skill}</span>;
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
        <button
            onClick={() => {
            if (previewRef.current) exportPdf(previewRef.current, "resume.pdf");
            }}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
            Download PDF
      </button>

    </>
  );
};

export default CanvasComponent;
