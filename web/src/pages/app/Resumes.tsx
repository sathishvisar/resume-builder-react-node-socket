import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ListResume, CreateResume } from '@/features/resume/resumeThunks'
import { Heading } from "@/components/atoms/Typography"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/atoms/Button"
import ResumeCard from "@/components/molecules/ResumeCard"


const Resumes: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const list = useAppSelector((state) => state.resume.List);
    const new_resume = useAppSelector((state) => state.resume.new_resume_data);

    useEffect(() => {
        dispatch(ListResume())
    }, [dispatch])

    useEffect(() => {
        if(new_resume){
            navigate(`/app/resume/edit/${new_resume._id}`)
        }
    },[new_resume, navigate])

    const createResume = () =>{
        dispatch(CreateResume())
    }
    return <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
            <Heading variant="h3">Resumes</Heading>
            <Button size="small" onClick={()=>{createResume()}}>+ Create New</Button>
        </div>
        <div className="grid grid-cols-12 gap-4">
        {
            list.map((item) => {
                return<><ResumeCard item={item} />
            </>})
        }
        </div>
    </div>
}

export default Resumes