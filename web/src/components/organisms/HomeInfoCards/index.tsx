import { Heading } from "@/components/atoms/Typography";
import InfoCard, { CardInfo } from "../../molecules/InfoCard";
import React from "react";
import ImgManageYourWork from "./../../../assets/images/resume-builder-1.png";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/Icon";
const features = [
  'New, professional designs',
  'ATS-friendly',
  'AI-powered content',
  'Step-by-step support',
  'Matching cover letter',
  'Unlimited resumes'
];

export const cardInfo: CardInfo[] = [
  {
    title: 'Choose a recruiter-approved template',
    description: '',
    icon: 'RoundedComments',
  },
  {
    title: 'Add skills and bullet points in one click',
    description: '',
    icon: 'RoundedDashboard',
  },
  {
    title: 'Finish your resume in minutes',
    description: '',
    icon: 'RoundedBell',
  },
  {
    title: 'Download in Word, PDF and more',
    description: '',
    icon: 'RoundedNotes',
  }
];
const HomeInfoCards: React.FC = () => {
  return (
    <section className="container py-24">
      <Heading variant="h1" className="mb-16 text-center">
        Make a Resume That Gets Results
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-20 mb-28">
        {cardInfo.map((item, index) => {
          return <InfoCard key={index} {...item} />;
        })}
      </div>
      <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-6 lg:col-span-7">
            <img
              src={ImgManageYourWork}
              alt="Why Use Our Online Resume Builder"
              className="w-full"
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-5 place-content-center">
             <div className="sm:text-center md:text-left mx-auto w-fit">
                <Heading variant="h2" className="mb-8">
                  Why Use Our Online Resume Builder
                </Heading>
                <ul className="flex flex-col gap-2 text-body-m text-gray-700 mb-[40px]">
                    {
                        features.map((item, index) => <li key={index} className="flex items-center gap-2"><Icon name="CheckCircle" />{item}</li>)
                    }
                </ul>
                <Button
                  size="medium"
                  shape="rounded"
                  color="blue"
                  className="gap-2"
                >
                  Learn more <Icon name="ArrowRight" />
                </Button>
             </div>
          </div>
      </div>
    </section>
  );
};

export default HomeInfoCards;
