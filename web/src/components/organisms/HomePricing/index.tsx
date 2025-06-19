import ToggleButton from "@/components/atoms/ToggleButton";
import { Heading } from "@/components/atoms/Typography";
import PricingCard, { PricingPlan } from "@/components/molecules/PricingCard";
import React from "react";

const pricingData: PricingPlan[] = [
  {
    plan: "Basic",
    isPopular: false,
    pricing: 5.40,
    icon: "IconSmiley2",
    features: [
      { feature: "Aenean neque tortor, purus faucibus", isAvailable: true },
      { feature: "Nullam augue vitae et volutpat sagittis augue", isAvailable: true },
      { feature: "Mauris massa penatibus enim elit quam", isAvailable: false },
      { feature: "Nec ac sagittis nunc bibendum", isAvailable: false },
      { feature: "Odio ut orci volutpat ultricies eleifend", isAvailable: false },
    ],
  },
  {
    plan: "Standard",
    isPopular: true,
    pricing: 10.50,
    icon: "IconSmiley1",
    features: [
      { feature: "Aenean neque tortor, purus faucibus", isAvailable: true },
      { feature: "Nullam augue vitae et volutpat sagittis augue", isAvailable: true },
      { feature: "Mauris massa penatibus enim elit quam", isAvailable: true },
      { feature: "Nec ac sagittis nunc bibendum", isAvailable: true },
      { feature: "Odio ut orci volutpat ultricies eleifend", isAvailable: false },
    ],
  },
  {
    plan: "Ultimate",
    isPopular: false,
    pricing: 15.00,
    icon: "IconSmiley3",
    features: [
      { feature: "Aenean neque tortor, purus faucibus", isAvailable: true },
      { feature: "Nullam augue vitae et volutpat sagittis augue", isAvailable: true },
      { feature: "Mauris massa penatibus enim elit quam", isAvailable: true },
      { feature: "Nec ac sagittis nunc bibendum", isAvailable: true },
      { feature: "Odio ut orci volutpat ultricies eleifend", isAvailable: true },
    ],
  },
];

const HomePricing: React.FC = () => {
    return <section className="container py-24">
        <div className="text-center">
            <Heading variant="h1" className="mb-10">Transparent Pricing for You</Heading>
            <ToggleButton
                className="mb-10"
                labelLeft="Bill Monthly"
                labelRight="Bill Yearly"
                initialValue={false}
                onToggle={(value) => {
                    console.log("Toggled:", value); // true or false
                }}
            />
            <div className="grid grid-cols-12 gap-6">
                { pricingData.map((item, index) => {
                    return <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <PricingCard plan={item} key={index} />
                    </div>
                })}
            </div>
        </div>
    </section>
}

export default HomePricing