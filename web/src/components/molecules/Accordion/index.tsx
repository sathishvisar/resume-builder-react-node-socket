import React, { useState, PropsWithChildren } from "react";

interface ItemProps extends PropsWithChildren {
  title: string;
  keepMounted?: boolean;
}

export const AccordionItem: React.FC<ItemProps> = ({ title, children, keepMounted = false }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded bg-white px-8">
      {/* header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-medium text-gray-800">{title}</span>
        <svg
          className={`h-5 w-5 transform transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* panel */}
      <div
        className={`grid transform-gpu transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {/* <div className="pb-4 text-gray-600">{children}</div> */}
           {keepMounted || open ? (
            <div className={`pb-4 text-gray-600 ${!open && keepMounted ? "hidden" : ""}`}>
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
