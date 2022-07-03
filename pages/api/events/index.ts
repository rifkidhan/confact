import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const events = await prisma.events.findMany()
      return res.status(200).json(events)
    } catch (e: any) {
      console.log(e)
      return res.status(500).json({ error: e.toString() })
    }
  }
  if (req.method === 'POST') {
    try {
      const bodyObject = JSON.parse(req.body)
      const events = await prisma.events.create({
        data: bodyObject,
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
