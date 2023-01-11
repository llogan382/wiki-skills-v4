import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react';

import { authOptions } from '../auth/[...nextauth]';
// POST /api/interests/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  const profileId = req.query.id;
  const {
    experience,
    experienceDetails,
    interests} = req.body;
    const session = await getSession({ req })

    // const session = await unstable_getServerSession(req, res, authOptions)


    if(session){
      const userInfo = await prisma.interests.create({
        data: {
          title: interests,
          users: {
            create: [{
              experience: experience,
              experienceDetails: experienceDetails,
              user: {
                connect: {
                  id: Number(profileId)
                }
              }
            }]
          }
        }
      })
      res.send(userInfo);

    } else {
      res.status(401).send({ message: 'Unauthorized' })
    }


}
