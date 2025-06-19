import { BodyText, Display, Heading } from "@/components/atoms/Typography"
import { Icon } from "@/components/Icon"
import { TestimonialsData } from "./data"
import { useState } from "react"

const Testmonial: React.FC = () => {
    const [active, setActive] = useState(0);

    const activeTesimonial = TestimonialsData[active];

    const toggleNext = () => {
        console.log(active , TestimonialsData.length)
        if(active === (TestimonialsData.length - 1)){
            setActive(0)
        }else{
            setActive(active + 1)
        }
    }

    const togglePrev = () => {
        if(active === 0){
            setActive(TestimonialsData.length - 1)
        }else{
            setActive(active - 1)
        }
    }

    return <section className="bg-gray-100 p-4 md:p-24">
            <div className="container">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-6 bg-gray-900 text-white p-12 rounded-lg">
                        <Display variant="d1">420k</Display>
                        <BodyText variant="body-xxl" className="font-manrope">users are taking advantage of our Task Manager Tool. It’s a new transparent and efficient way to organize all of your daily tasks.</BodyText>
                    </div>
                    <div className="col-span-12 lg:col-span-6 bg-white p-12 rounded-lg place-content-center">
                        <div className="flex justify-between mb-8 transition-all duration-300 ease-in-out">
                            <span className="flex w-[52px] h-[52px] items-center place-content-center bg-primary-brand rounded-xl"><Icon name="IconDoubleQuotes" /></span>
                            <div className="flex gap-4">
                                <span onClick={()=>{togglePrev()}} className="cursor-pointer flex w-[36px] h-[36px] items-center place-content-center shadow-sm rounded-full"><Icon name="IconChevronLeft" /></span>
                                <span onClick={()=>{toggleNext()}} className="cursor-pointer flex w-[36px] h-[36px] items-center place-content-center shadow-sm rounded-full"><Icon name="IconChevronRight" /></span>
                            </div>
                        </div>
                        <BodyText variant="body-l" className="text-gray-700 mb-8" >{activeTesimonial.description}</BodyText>
                        <div className="flex gap-4 mb-10 transition-all duration-300 ease-in-out">
                            <div>
                                <img src={activeTesimonial.picture} alt="userPicture" className="w-[60px] h-[60px] rounded-full object-cover" />
                            </div>
                            <div className="flex flex-col gap-1 place-content-center">
                                <Heading variant="h6">{activeTesimonial.name}</Heading>
                                <BodyText variant="body-s" className="text-gray-600">{activeTesimonial.role}</BodyText>
                            </div>
                        </div>
                        <div className="flex place-content-center gap-4">
                            { TestimonialsData.map ((item, index) => {
                                return <span key={index} className={`flex h-[5px] rounded-full transition-all duration-300 ease-in-out  ${active === index ? 'w-[24px] bg-primary-brand' : 'w-[5px] bg-gray-500' }`}></span>
                            })}
                        </div>
                    </div>
                </div>
            </div>
    </section>
}


export default Testmonial