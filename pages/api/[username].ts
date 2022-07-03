import type { NextApiHandler } from 'next'
import prisma from '@lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: req.query.username as string,
        },
      })
      return res.status(200).json(user)
    } catch (e: any) {
      console.log(e)
      return res.status(500).json({ error: e.toString() })
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
