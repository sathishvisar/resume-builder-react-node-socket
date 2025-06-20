import React, { useCallback, useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import ResumeBuilder from '@/components/organisms/ResumeBuilder'
import PdfCanvasViewer from '@/components/organisms/ResumeBuilder/PdfCanvasViewer'
import useSocket from "@/hooks/useSocket";
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { ReadResume } from '@/features/resume/resumeThunks';


const DocsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((s) => s.user.userInfo);
  const { resume_data, resume_status } = useAppSelector((s) => s.resume);

  const { id } = useParams();

  const [resume, sendResume] = useState<any>(null)
  
  const sendToServer = useSocket(sendResume);

  useEffect(() => {
    if(!id) return
    dispatch(ReadResume(id))
  }, [dispatch, id])


    useEffect(() => {
    if(!resume_data?.data) return
    const pdfData = {
      user_id: user?._id,
      resume_id: id,
      data: resume_data?.data,
    }
    sendToServer(pdfData)
  }, [sendToServer, id, user, resume_data])

  const handleClick = useCallback((data: any) => {
    const pdfData = {
      user_id: user?._id,
      resume_id: id,
      data: data,
    }
    sendToServer(pdfData)
  }, [sendToServer, id, user]);

  if (resume_status === 'loading') {
    return <div className="h-screen flex items-center justify-center">loading...</div>;
  }
    return <>
      <section className="grid grid-cols-12 m-auto">
        <div id="form" className="col-span-5 p-4">
            <ResumeBuilder onClick={handleClick} resume_data={resume_data?.data || null}  />
        </div>
        <div id="pdf" className="col-span-7 p-4">
            <PdfCanvasViewer blob={resume} initialScale={1} />
        </div>
      </section>
    </>
}

export default DocsPage

