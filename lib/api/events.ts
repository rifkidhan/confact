import prisma from '@lib/prisma'

interface EventsProps {
  id: string
  title: string
  date: string
  description: string
  slug: string
}

export async function getAllEvents() {
  const datas = await prisma.events.findMany()

  const events = datas.map((data) => ({
    id: data.id,
    title: data.title,
    date: data.date,
    description: data.description,
    slug: data.slug,
  }))

  if (!datas) {
    return null
  }

  return events
}

export const getEventsSlug = async () => {
  const datas = await prisma.events.findMany({
    select: {
      slug: true,
    },
  })
  const events = datas.map((data) => ({
    slug: data.slug,
  }))

  if (!datas) {
    return null
  }

  return events
}

export const getEventBySlug = async (slug: string) => {
  const datas = await prisma.events.findUnique({
    where: {
      slug: slug,
    },
  })
  if (!datas) {
    return null
  }

  return datas
}
