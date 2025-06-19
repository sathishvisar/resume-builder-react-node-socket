import React from 'react';
import { Icon } from './../../Icon';
import { BodyText, Navigation } from '@/components/atoms/Typography';
import InputEmailSubscribe from '@/components/molecules/InputEmailSubscribe';

const menu = [
  { link: '/', name: 'Home' },
  { link: '/pricing', name: 'Pricing' },
  { link: '/docs', name: 'Docs' },
  { link: '/contact', name: 'Contact' },
];

const menu_terms = [
  { link: '/', name: 'Terms & Conditions' },
  { link: '/pricing', name: 'Privacy Policy' }
];


const socialLinks = [
  { link: '/', name: 'Facebook' },
  { link: '/', name: 'LinkedIn' },
  { link: '/', name: 'Youtube' },
  { link: '/', name: 'Twitter' },
];

const WebFooter: React.FC = () => {
  return (
    <footer className="container py-24">
        <div className='grid grid-cols-12'>
            <div className='col-span-12 md:col-span-4'>
                <Icon name="Logo" className="w-[44] h-auto mb-6" />
                <BodyText variant='body-s' className='text-gray-800 mb-[46px]'>
                    Proin ipsum pharetra, senectus eget scelerisque varius pretium platea velit. Lacus, eget eu vitae nullam proin turpis etiam mi sit. Non feugiat feugiat egestas nulla nec. Arcu tempus, eget elementum dolor ullamcorper sodales ultrices eros. 
                </BodyText>
                <div className='flex flex-col gap-y-2 text-center lg:text-left'>
                    <BodyText variant='body-xl'>Subscribe to our newsletter</BodyText>
                    <InputEmailSubscribe label='Subscribe' className="mb-4" />
                </div>
            </div>
            <div className='col-span-12 md:col-start-7 text-center md:text-left'>
                <div className='grid grid-cols-12'>
                    <div className='col-span-12 md:col-span-4'>
                        <ul className="flex flex-col gap-2 mb-10">
                            {menu.map((item, index) => (
                                <li key={index}>
                                    <Navigation href={item.link} className='text-gray-800'>{item.name}</Navigation>
                                </li>
                            ))}
                        </ul>
                        <ul className="flex flex-col gap-2">
                            {menu_terms.map((item, index) => (
                                <li key={index}>
                                    <Navigation href={item.link} className='text-gray-800'>{item.name}</Navigation>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='col-span-12 md:col-span-4'>
                        <ul className="flex flex-col gap-2">
                            {socialLinks.map((item, index) => (
                                <li key={index}>
                                    <Navigation href={item.link} className='text-gray-800'>{item.name}</Navigation>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='col-span-12 md:col-span-4'>
                         <div className='flex flex-col gap-2'>
                            <Navigation className='text-gray-800'>Contact Us</Navigation>
                            <Navigation href='mailto:example@gmail.com' className='text-gray-800'>example@gmail.com</Navigation>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-span-12 mt-16 text-center lg:text-left'>
                <BodyText variant='body-s' className='text-gray-600'>
                    2021. All rights reserved. Silicon Template
                </BodyText>
            </div>
        </div>
    </footer>
  );
};

export default WebFooter;
