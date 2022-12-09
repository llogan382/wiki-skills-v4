import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react'

// POST /api/post
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { interests, payments } = req.body
  try {
    const result = await prisma.user.update({
      where: {
        email: 'llogan382@gmail.com'
      },
      data: {
        payments: payments,
        interests: {
          connectOrCreate: [
          {
            where: {
              title: interests
            },
            create: {
              title: interests
            }
          }
        ]}
      }
    })
    res.status(200).send(result )
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }


}
