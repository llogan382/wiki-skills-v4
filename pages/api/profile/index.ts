import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react'

// POST /api/post
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  const session = await getSession({ req });

    const result = await prisma.profile.create({
      data: {
        bio: 'this is Luke',
        experience: '5 years',
        profileId: {
          connect: {
            id: 'clbdv60120000pbcygnxbo4zw'
          }
        }
      },
    });
    console.log(result);
    // res.json(result);
}
