import React, { useRef } from "react";
import { BodyText, Display } from "../../atoms/Typography";
import heroImage from "./../../../assets/images/banner.png";
import { Button } from "../../atoms/Button";

const HeroSection: React.FC = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const container = e.currentTarget;
    const img = imgRef.current;

    if (!img) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const moveX = ((x - width / 2) / width) * -20;
    const moveY = ((y - height / 2) / height) * -20;

    img.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleMouseLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = 'translate(0, 0)';
    }
  };

  return (<>
    <section className="relative pt-24 bg-contain bg-right bg-no-repeat -z-10">
      <div className="container mx-auto flex justify-between grid grid-cols-12">
        <div className="col-span-12 lg:col-span-7 xl:col-span-6 flex-wrap h-full pt-5 mt-4">
          <div className="w-full px-4 lg:px-0">
            <div className="flex-1 text-center lg:text-left">
              <Display variant="d4" className="mb-8 pt-5">
                Resume Builder (Fast, Easy & Free to Use)
              </Display>

              <BodyText variant="body-l" className="mb-12 text-gray-700">
               Create your resume easily with one of the best online resume builders. Use it on your computer or phone, choose from recruiter-approved templates, and add skills and phrases in one click. Trusted by millions — and free to use!
              </BodyText>

              <Button
                size="medium"
                shape="rounded"
                color="blue"
                className="mb-[112px] shadow-button"
              >
                Get started for free
              </Button>

            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 xl:col-span-6 flex h-full -mt-8 hidden lg:block"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}>
          <div className="absolute top-12 right-0 h-full -z-10 bg-no-repeat bg-right left-1/2 w-1/2 bg-cover md:bg-contain lg:bg-contain absolute -mr-12 lg:-mt-12" 
            ref={imgRef} 
            
            style={{ backgroundImage: `url(${heroImage})` }} />
            {/* <div ref={imgRef} style={{ backgroundImage: `url(${heroImage})`,     backgroundPositionX: `calc(100% + 10rem)` }}
              className="w-full h-full bg-no-repeat bg-right bg-auto transition-transform duration-300 ease-out will-change-transform" />
                onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
             */}
        </div>
      </div>
    </section>
  </>);
};
// absolute top-0 right-0 w-1/2 h-full z-0
export default HeroSection;
