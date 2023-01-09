import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react';
import { create } from 'domain';
import Email from 'next-auth/providers/email';
import { unstable_getServerSession } from "next-auth/next"

import { authOptions } from '../auth/[...nextauth]';

// TODO: Add Image
// TODO: Finish adding location
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const profileId = req.query.id;
  const session = await unstable_getServerSession(req, res, authOptions)


if(req.method === "GET"){
  console.log(req.body)

  const userProfile = await prisma.user.findUnique({
    where: {
      id: Number(profileId),
    },
    include: {
      interests: true
    }
  })
  res.status(200).json( userProfile )
  // console.log(userProfile)

  return
}

  const {
    bio,
    experience,
    userId,
    payments,
    street1,
    street2,
    city,
    state,
    zipcode,
    phone,
    faceTime,
    email,
    textMessage,
    linkedIn,
    facebook,
    twitter,
    instagram,
    tikTok,
    youtube,
    interests} = req.body;



  // ID in the profile matches locationProfile
  if (session) {
    const userInfo = await prisma.user.update({
      where: {
        id: Number(profileId),
      },
      data: {
        bio: bio,
        payments: payments,
        street1: street1,
        street2: street2,
        city: city,
        State: state,
        zipcode: Number(zipcode),
        contact: {
          upsert: {
            update: {
              userIdForContact: Number(profileId),
              phone: phone,
              faceTime: faceTime,
              email: email,
              textMessage: textMessage,
              linkedIn: linkedIn,
              facebook: facebook,
              twitter: twitter,
              instagram: instagram,
              tikTok: tikTok,
              youtube: youtube,
            },
            create: {
              userIdForContact: Number(profileId),
              phone: phone,
              faceTime: faceTime,
              email: email,
              textMessage: textMessage,
              linkedIn: linkedIn,
              facebook: facebook,
              twitter: twitter,
              instagram: instagram,
              tikTok: tikTok,
              youtube: youtube,
            }
          }
        }
      }

    })
    res.send(userInfo);

    res.json(userInfo);
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}
