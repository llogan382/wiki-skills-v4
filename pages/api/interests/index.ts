import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react';
import { create } from 'domain';
import Email from 'next-auth/providers/email';
import e from 'cors';
import { unstable_getServerSession } from "next-auth/next"

import { authOptions } from '../auth/[...nextauth]';
// POST /api/interests
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  const profileId = req.query.id;
  const {
    experience,
    title,
    experienceDetails,
    interests} = req.body;

    const session = await unstable_getServerSession(req, res, authOptions)

  // The user exists. Connect or create
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  if(session){
    const userInfo = await prisma.interests.create({
      data: {
        title: 'hello',
        users: {
          create: [{
            experience: new Date(),
            experienceDetails: "fun",
            user: {
              connect: {
                id: 8
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
