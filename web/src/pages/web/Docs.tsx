import React, { useCallback, useEffect, useState } from "react"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
// import ResumeGenerator from '@/components/organisms/ResumeGenerator'
import ResumeBuilder from '@/components/organisms/ResumeBuilder'
// import CanvasComponent from '@/components/organisms/ResumeBuilder/CanvasComponent'
import PdfCanvasViewer from '@/components/organisms/ResumeBuilder/PdfCanvasViewer'
// import usePdfReady from "@/hooks/usePdfReady";
import useSocket from "@/hooks/useSocket";
import { GoogleBtnLogin } from "@/features/auth/authThunks";
import { useAppDispatch } from "@/store/hooks";
import { UserInfo } from "@/features/user/userThunks";

const DocsPage: React.FC = () => {

  

  const [resume, sendResume] = useState<any>(null)
  
  const sendToServer = useSocket(sendResume);

  const dispatch = useAppDispatch();
  
  // const { pdfBlob } = usePdfReady();

  const handleClick = useCallback((data: any) => {
    console.log(data)
    sendToServer(data)
  }, [sendToServer]);

  useEffect(() =>{
    dispatch(UserInfo())
  }, [dispatch])

    return <>
    <section className="grid grid-cols-12 w-[90%] m-auto">
                  <GoogleOAuthProvider clientId="962389189869-ip0ton69pna7kfg7me1q01cjd97ugsnu.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log('credentialResponse', credentialResponse)
                  const token = credentialResponse.credential;
                  dispatch(GoogleBtnLogin(token as string));
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
              </GoogleOAuthProvider>;
    </section>
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

