import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

import { getSession } from 'next-auth/react';


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {  payments, userEmail, interests } = req.body
  console.log(interests)
  const session = await getSession({ req })

    const result = await prisma.user.update({
      where: { email: String(session.user.email)},
      data: {
        email: userEmail,
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
          ]
        }
      }
    })
    res.json(result);

}
