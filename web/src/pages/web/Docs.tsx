import React, { useCallback, useState } from "react"
// import ResumeGenerator from '@/components/organisms/ResumeGenerator'
import ResumeBuilder from '@/components/organisms/ResumeBuilder'
// import CanvasComponent from '@/components/organisms/ResumeBuilder/CanvasComponent'
import PdfCanvasViewer from '@/components/organisms/ResumeBuilder/PdfCanvasViewer'
// import usePdfReady from "@/hooks/usePdfReady";
import useSocket from "@/hooks/useSocket";

const DocsPage: React.FC = () => {

  

  const [resume, sendResume] = useState<any>(null)
  
  const sendToServer = useSocket(sendResume);


  const handleClick = useCallback((data: any) => {
    console.log(data)
    sendToServer(data)
  }, [sendToServer]);

    return <>
      <section className="grid grid-cols-12 w-[90%] m-auto">
              <div className="col-span-6 p-8">
                  <ResumeBuilder onClick={handleClick}  />
              </div>
              <div className="col-span-6 p-8">
                  <PdfCanvasViewer blob={resume} initialScale={1} />
              </div>
      </section>
    </>
}

export default DocsPage

