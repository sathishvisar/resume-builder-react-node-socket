import React, { Suspense, useEffect } from "react"
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useAppDispatch } from '@/store/hooks';
import { UserLogin } from "@/features/auth/authThunks";


const HomeInfoCards = React.lazy(() => import('@/components/organisms/HomeInfoCards'));
const HeroSection = React.lazy(() => import('@/components/organisms/HeroSection'));
const InfoHorizontalTab = React.lazy(() => import('@/components/organisms/InfoHorizontalTab'));
// const HomePricing = React.lazy(() => import('@/components/organisms/HomePricing'));
const EmailSubscription = React.lazy(() => import('@/components/organisms/EmailSubscription'));
const TopWorkTools = React.lazy(() => import('@/components/organisms/TopWorkTools'));
const Testimonial = React.lazy(() => import('@/components/organisms/Testimonial'));

 

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch()
    

    const email = "sathish.visar+9@gmail.com";
    const password = "Sat@2282#";

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
        dispatch(UserLogin({ email, password }));

    }, [dispatch]);

    return <>
        <Suspense fallback={<div>Loading...</div>}>
            <div data-aos="fade-up"><HeroSection /></div>
            <div data-aos="fade-up" data-aos-delay="100"><HomeInfoCards /></div>
            <div data-aos="fade-up" data-aos-delay="200"><InfoHorizontalTab /></div>
            {/* <div data-aos="fade-up" data-aos-delay="300"><HomePricing /></div> */}
            <div data-aos="fade-up" data-aos-delay="400"><Testimonial /></div>
            <div data-aos="fade-up" data-aos-delay="500"><TopWorkTools /></div>
            <div data-aos="fade-up" data-aos-delay="600"><EmailSubscription /></div>
        </Suspense>
    </>
}

export default HomePage