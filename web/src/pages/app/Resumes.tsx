import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ListResume } from '@/features/resume/resumeThunks'
import UpdatedTime from "@/components/UpdatedTime"
import { BodyText, Heading, Navigation } from "@/components/atoms/Typography"
import { useNavigate } from "react-router-dom"

const Resumes: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const list = useAppSelector((state) => state.resume.List);

    useEffect(() => {
        dispatch(ListResume())
    }, [dispatch])
    return <div className="flex flex-col gap-y-4">
        <Heading variant="h3">Resumes</Heading>
        <div className="flex gap-4">
        {
            list.map((item) => {
                return <div key={item._id} className="flex flex-col  border border-gray-300 p-4">
                    <Heading variant="h5" className="mb-2">{item?.name || 'Untitled'}</Heading>
                    <BodyText variant="body-xs" className="mb-4"><UpdatedTime date={item.updatedAt} /> </BodyText>
                    <Navigation className="body-s mb-2" onClick={()=>{navigate(`/app/resume/edit/${item._id}`)}}>Edit PDF</Navigation>
                    <Navigation className="body-s"
                    href={`${process.env.REACT_APP_API_URL}/api/resume/download/${item._id}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    >Download PDF</Navigation>
                </div>
            })
        }
        </div>
    </div>
}

export default Resumes