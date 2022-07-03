import { Layout } from '@components/common'
import { Button } from '@components/ui'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { getAllEvents } from '@lib/api/events'

interface EventsProps {
  id: string
  title: string
  date: string
  description: string
  slug: string
}
const Events = ({ events }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="container mx-auto flex flex-col items-center gap-5">
      <div>
        {events.map((item: EventsProps) => (
          <div key={item.id}>
            <Link href={`/events/${item.slug}`}>
              <div className="border-2 border-secondary ">
                <div>{item.title}</div>
                <div>{item.date}</div>
                <div>{item.description}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <Button>
          <Link href={'/events/addEvent'}>Add event</Link>
        </Button>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const web = process.env.WEBSITE_URL as string
  const events = await getAllEvents()

  return {
    props: { events },
  }
}

Events.Layout = Layout

export default Events
