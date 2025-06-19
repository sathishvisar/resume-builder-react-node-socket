import { BodyText, Heading } from "@/components/atoms/Typography";
import React from "react";
import { Icon, IconName } from "@/components/Icon";

export interface CardInfo {
  title: string;
  description: string;
  icon: IconName;
}

const InfoCard: React.FC<CardInfo> = ({ title, description, icon }) => {
  return (
    <div className="w-full">
      <Icon name={icon} className="mb-6 m-auto" />
      <Heading variant="h5" className="text-center mb-3">
        {title}
      </Heading>
      <BodyText variant="body-s" className="text-center text-gray-700">
        {description}
      </BodyText>
    </div>
  );
};

export default InfoCard;
