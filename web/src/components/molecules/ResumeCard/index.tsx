import UpdatedTime from "@/components/UpdatedTime"
import { BodyText, Heading, Navigation } from "@/components/atoms/Typography"
import { useNavigate } from "react-router-dom";

interface Props {
    item: any
}

const ResumeCard: React.FC<Props> = ({item}) => {
    const navigate = useNavigate()

  return (
    <>
      <div
        className="col-span-12 md:col-span-6 lg:col-span-4 flex p-2 gap-4"
        key={item._id}
      >
        <div className="flex w-1/3">
          <img src={item?.thumbnail} alt="Resume Thumbnail" />
        </div>
        <div className="flex w-1/2 flex-col  border border-gray-300/0 p-4">
          <Heading variant="h5" className="mb-2">
            {item?.name || "Untitled"}
          </Heading>
          <BodyText variant="body-xs" className="mb-4">
            <UpdatedTime date={item.updatedAt} />{" "}
          </BodyText>
          <Navigation
            className="body-s mb-2"
            onClick={() => {
              navigate(`/app/resume/edit/${item._id}`);
            }}
          >
            Edit PDF
          </Navigation>
          <Navigation
            className="body-s mb-2"
            href={`${process.env.REACT_APP_API_URL}/api/resume/download/${item._id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </Navigation>
          <Navigation
            className="body-s mb-2"
            onClick={() => {
              alert();
            }}
          >
            Delete Resume
          </Navigation>
        </div>
      </div>
    </>
  );
};

export default ResumeCard;
