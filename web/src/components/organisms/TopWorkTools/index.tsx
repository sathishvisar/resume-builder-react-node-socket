import { Button } from "@/components/atoms/Button"
import { BodyText, Heading } from "@/components/atoms/Typography"
import { Icon, IconName } from "@/components/Icon"

const Tools: IconName[] = [
 "Dropbox", "Evernote", "Gmail", "Google", "MailChimp", "Slack", "Trello", "Zoom"
]

const TopWorkTools: React.FC = () => {
    return <section className="container py-24">
            <div className="text-center">
                <Heading variant="h1" className="mb-6">Integrate Top Work Tools</Heading>
                <BodyText variant="body-l" className="text-gray-600 mb-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat mollis egestas. Nam luctus facilisis ultrices. Pellentesque volutpat ligula est. Mattis fermentum, at nec lacus.</BodyText>
                <div className="flex place-content-center flex-wrap gap-6 mb-12">
                    {Tools.map((item, i) => {
                        return <div key={i} className="shadow-sm rounded-lg p-4">
                            <Icon name={item} />
                        </div>
                    })}
                </div>
                <Button
                    size="medium"
                    shape="rounded"
                    color="blue"
                >
                    View all intergrations
                </Button>
            </div>
    </section>
}


export default TopWorkTools