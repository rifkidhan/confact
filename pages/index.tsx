import { Layout } from '@components/common'

import { Hero, Banner } from '@components/ui'

const Home = () => {
  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <Banner />
    </div>
  )
}

Home.Layout = Layout

export default Home
