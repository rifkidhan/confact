import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const events = await prisma.events.findUnique({
        where: {
          slug: req.query.slug as string,
        },
      })
      return res.status(200).json(events)
    } catch (e: any) {
      console.log(e)
      return res.status(500).json({ error: e.toString() })
    }
  } else if (req.method === 'PUT') {
    try {
      const bodyObject = JSON.parse(req.body)
      const { title, slug, date, description } = bodyObject
      const events = await prisma.events.update({
        where: {
          slug: req.query.slug as string,
        },
        data: {
          title: title,
          slug: slug,
          date: date,
          description: description,
        },
      })
      if (events) {
        await res.revalidate(`/events`)
      }
      return res.status(200).json(events)
    } catch (e: any) {
      console.log(e)
      return res.status(500).json({ error: e.toString() })
    }
  } else if (req.method === 'DELETE') {
    try {
      const events = await prisma.events.delete({
        where: {
          slug: req.query.slug as string,
        },
      })
      if (events) {
        await res.revalidate(`/events`)
      }
      return res.status(200).json(events)
    } catch (e: any) {
      console.log(e)
      return res.status(500).json({ error: e.toString() })
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
