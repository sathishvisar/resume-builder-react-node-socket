import { Heading } from "@/components/atoms/Typography"
import React from "react"
import UseCase1 from '@/assets/images/use-cases/1.png'
import UseCase2 from '@/assets/images/use-cases/2.png'
import UseCase3 from '@/assets/images/use-cases/3.png'
import UseCase4 from '@/assets/images/use-cases/4.png'
import Tabs, { TabItem } from "@/components/molecules/Tabs"

const UseCaseItems: TabItem[] = [
    {
        title: 'Project Management',
        icon: 'BarStart',
        content: {
            title: 'Project management',
            description: 'Vestibulum nunc lectus auctor quis. Natoque lectus tortor lacus, eu. Nunc feugiat nisl maecenas nulla hac morbi. Vitae, donec facilisis sed nunc netus. Venenatis posuere faucibus enim est. Vel dignissim morbi blandit morbi tellus. Arcu ullamcorper quis enim.',
            image: UseCase1
        }
    },
    {
        title: 'Remote Work',
        icon: 'BarBriefcase',
        content: {
            title: 'Remote Work',
            description: 'Ut ornare quisque blandit condimentum nec viverra habitant non. Consequat id leo bibendum enim, fringilla pulvinar volutpat fames. Ut fames ut sed lobortis nulla. In dui enim et pharetra gravida diam semper lectus tellus. Faucibus mi convallis.',
            image: UseCase2
        }
    },
    {
        title: 'Product release',
        icon: 'BarRocket',
        content: {
            title: 'Product release',
            description: 'Fames netus pretium massa lobortis sit metus et. Sit risus odio fermentum hac fames enim, ac, in. Neque lacus, consequat hendrerit potenti in tristique dictum. Tortor nec lorem et venenatis facilisis risus viverra nunc, eu. Eget suscipit vel amet.',
            image: UseCase3
        }
    },
    {
        title: 'Campaign planning',
        icon: 'BarChart',
        content: {
            title: 'Campaign planning',
            description: 'Diam bibendum scelerisque vel mauris magna. Iaculis interdum tincidunt eget nibh purus. Aliquet at sit morbi nisi volutpat fermentum scelerisque. Enim tincidunt eros sodales integer sapien. Eu ullamcorper egestas odio nunc faucibus. Sapien eu nunc sed facilisi luctus ac.',
            image: UseCase4
        }
    }
]

const InfoHorizontalTab: React.FC = () => {
    return <section className="container py-24">
            <div className="text-center">
                <Heading variant="h1" className="mb-10">One Tool — Endless Use Cases</Heading>
                <Tabs items={UseCaseItems} />
            </div>
    </section>
}

export default InfoHorizontalTab