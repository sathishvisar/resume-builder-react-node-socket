import React, { Suspense, useEffect } from "react"
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useAppDispatch } from '@/store/hooks';

const HomeInfoCards = React.lazy(() => import('@/components/organisms/HomeInfoCards'));
const HeroSection = React.lazy(() => import('@/components/organisms/HeroSection'));
const EmailSubscription = React.lazy(() => import('@/components/organisms/EmailSubscription'));
const TopWorkTools = React.lazy(() => import('@/components/organisms/TopWorkTools'));
const Testimonial = React.lazy(() => import('@/components/organisms/Testimonial'));

 

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch()


    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, [dispatch]);

    return <>
        <Suspense fallback={<div>Loading...</div>}>
            <div data-aos="fade-up"><HeroSection /></div>
            <div data-aos="fade-up" data-aos-delay="100"><HomeInfoCards /></div>
            <div data-aos="fade-up" data-aos-delay="200"><Testimonial /></div>
            <div data-aos="fade-up" data-aos-delay="300"><TopWorkTools /></div>
            <div data-aos="fade-up" data-aos-delay="400"><EmailSubscription /></div>
        </Suspense>
    </>
}

export default HomePage