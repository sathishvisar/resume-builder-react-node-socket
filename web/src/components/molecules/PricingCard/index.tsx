import { Button } from '@/components/atoms/Button';
import { BodyText, Heading } from '@/components/atoms/Typography';
import { Icon, IconName } from '@/components/Icon';
import clsx from 'clsx';
import React from 'react'
 
interface Features {
    feature: string;
    isAvailable: boolean;
}

export interface PricingPlan {
    plan: string;
    isPopular: boolean;
    pricing: number;
    icon: IconName
    features: Features[];
}

export interface PricingCardProps {
    plan: PricingPlan;
}

const PricingCard: React.FC<PricingCardProps> = ({plan}) => {
    return <div className={clsx('grid border border-gray-300 rounded-xl p-12 gap-y-4 shadow-sm border-opacity-[0.35]', { 'border-primary-brand': plan.isPopular })}>
        <Icon name={plan.icon} className='m-auto' />
        <BodyText variant='body-xl' className='text-gray-600'>{plan.plan}</BodyText>
        <Heading variant='h2'>$ {plan.pricing}</Heading>
        <hr className='border border-gray-200'></hr>
         <ul className="flex flex-col gap-2 text-body-s text-gray-700 text-left mb-[40px]">
            {
                plan.features.map((item, index) => <li key={index} className="flex items-center gap-2"><Icon name={item.isAvailable ? 'IconCheck' : 'IconX'} />{item.feature}</li>)
            }
        </ul>
        <Button 
            color={plan.isPopular ? 'blue' : 'secondary'} 
            size='small'   
            className={clsx('w-full', { 'shadow-button': plan.isPopular })}
            >Start free trial</Button>
    </div>
}

export default PricingCard