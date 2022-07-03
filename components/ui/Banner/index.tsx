import { FC } from 'react'
import { LoadImage, Card, Button } from '@components/ui'

const Banner: FC = () => {
  return (
    <div className="container relative mx-auto h-full w-full">
      <div className="relative">
        <div className="absolute inset-0 hidden h-full w-full overflow-hidden rounded-3xl md:block">
          <div className="relative h-full w-full">
            <LoadImage
              src="/featured.png"
              className="h-full w-full object-cover"
              width={1000}
              height={1000}
              alt="Feature image"
            />
          </div>
        </div>
        <div className="relative grid h-full grid-cols-1 gap-5 border-2 border-secondary md:grid-cols-2 md:border-none md:p-16 xl:grid-cols-3">
          <Card
            type="event"
            className="max-h-full bg-primary"
            name="Nama"
            job="Job"
            image="/Person1.png"
            date="Tanggal Berapa Aja"
            title="Test Card dengan judul apaan aja nich"
          />
          <div className="inline-grid h-full grid-cols-2 gap-3 md:place-items-end xl:col-start-3">
            <Button variant="ghost">Remind Me</Button>
            <Button variant="ghost">Participant</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
