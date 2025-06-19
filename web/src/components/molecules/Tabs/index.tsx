import { Button } from "@/components/atoms/Button";
import { BodyText, Heading } from "@/components/atoms/Typography";
import React, { useState }  from "react";
import { Icon, IconName } from "@/components/Icon";

interface TabContent {
  title: string;
  description: string;
  image: string;
}

export interface TabItem {
  title: string;
  icon: IconName;
  content: TabContent;
}

export interface TabsProps {
  items: TabItem[];
}

const Tabs: React.FC<TabsProps> = ({items}) => {
    const [activeTab, setActiveTab] = useState<number>(0)

    const activeItem = items[activeTab]['content'] || null;

    return <>
        <div className="flex place-content-center gap-4 mb-10 flex-col lg:flex-row">
            {
                items.map((item:any, index: number) => {
                    return <Button size="small" color={index === activeTab ? 'blue' : 'secondary'} key={index} onClick={() => setActiveTab(index)} className="gap-2">
                        <Icon name={item.icon} />   {item.title}
                    </Button>
                })
            }
        </div>
        { activeItem && (
        <div className="bg-gray-100 grid grid-cols-12 rounded-xl py-6 px-12 items-center">
            <div className="col-span-12 md:col-span-5">
                <Heading variant="h3" className="text-left text-gray-900 mb-8">{activeItem['title']}</Heading>
                <BodyText variant="body-m" className="text-left text-gray-700">{activeItem['description']}</BodyText>
            </div>
            <div className="col-span-12 md:col-span-7">
                <img src={activeItem['image']} alt={activeItem['title']} width="525" />
            </div>
        </div>)}
    </>
}

export default Tabs