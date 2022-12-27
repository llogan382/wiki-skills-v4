import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { unstable_getServerSession } from "next-auth/next"

import { authOptions } from '../auth/[...nextauth]';
// POST /api/interests/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  const profileId = req.query.id;
  console.log(req.body);
  const {
    experience,
    experienceDetails,
    interests} = req.body;

    const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  if(session){
    const userInfo = await prisma.interests.create({
      data: {
        title: interests,
        users: {
          create: [{
            experience: new Date(experience),
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
