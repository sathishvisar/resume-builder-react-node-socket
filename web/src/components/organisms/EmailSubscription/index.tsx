import { BodyText, Heading } from "@/components/atoms/Typography"
import InputEmailSubscribe from "@/components/molecules/InputEmailSubscribe"

const EmailSubscription: React.FC = () => {
    return <section className="container bg-gray-900 rounded-lg">
            <div className="text-white text-center p-24">
                <Heading variant="h1" className="mb-6">Ready to Get Started? </Heading>
                <BodyText variant="body-l" className="mb-10 opacity-[0.7]">Organize your tasks with a 14-day free trial</BodyText>
                <InputEmailSubscribe className="mb-4 m-auto" label="Get started for free" />
                <BodyText variant="body-s" className="opacity-[0.5]">No subscriptions. No annual fees. No lock-ins.</BodyText>
            </div>
    </section>
}


export default EmailSubscription