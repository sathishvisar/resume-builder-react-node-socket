import { Heading } from "@/components/atoms/Typography";
import InfoCard, { CardInfo } from "../../molecules/InfoCard";
import React from "react";
import ImgManageYourWork from "./../../../assets/images/ManageYourWork.png";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/Icon";
const features = [
  'Powerful project management',
  'Transparent work management',
  'Manage work & focus on the most important tasks',
  'Track your progress with interactive charts',
  'Easiest way to track time spent on tasks',
];

export const cardInfo: CardInfo[] = [
  {
    title: 'Task Comments',
    description: 'Id mollis consectetur congue egestas egestas suspendisse blandit justo.',
    icon: 'RoundedComments',
  },
  {
    title: 'Tasks Analytics',
    description: 'Augue pulvinar justo, fermentum fames aliquam accumsan vestibulum non.',
    icon: 'RoundedDashboard',
  },
  {
    title: 'Notifications',
    description: 'Mattis urna ultricies non amet, purus in auctor non. Odio vulputate ac nibh.',
    icon: 'RoundedBell',
  },
  {
    title: 'Sections & Subtasks',
    description: 'A elementum, imperdiet enim, pretium etiam facilisi in aenean quam mauris.',
    icon: 'RoundedNotes',
  },
  {
    title: 'Progress Tracking',
    description: 'Sit facilisis dolor arcu, fermentum vestibulum arcu elementum imperdiet eleifend.',
    icon: 'RoundedCalendar',
  },
  {
    title: 'Multiple Assignees',
    description: 'Faucibus cursus maecenas lorem cursus nibh. Sociis sit risus id. Sit facilisis dolor arcu.',
    icon: 'RoundedUsers',
  },
  {
    title: 'Support 24/7',
    description: 'Sapien sed massa sit erat pellentesque pellentesque nisl, elementum.',
    icon: 'RoundedSupport',
  },
  {
    title: 'Data Security',
    description: 'Aliquet felis facilisi sem nunc. Sapien fermentum, fringilla molestie lorem nec.',
    icon: 'RoundedSecurity',
  },
];
const HomeInfoCards: React.FC = () => {
  return (
    <section className="container py-24">
      <Heading variant="h1" className="mb-16 text-center">
        Stay Organized & Connected
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-[52px] mb-28">
        {cardInfo.map((item, index) => {
          return <InfoCard key={index} {...item} />;
        })}
      </div>
      <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-6 lg:col-span-7">
            <img
              src={ImgManageYourWork}
              alt="Manage Your Work"
              className="w-full"
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-5 place-content-center">
             <div className="sm:text-center md:text-left mx-auto w-fit">
                <Heading variant="h2" className="mb-8">
                  Manage Your Work
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
