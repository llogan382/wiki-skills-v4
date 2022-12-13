import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

import { getSession } from 'next-auth/react';


// TODO: Add Image
// TODO: Add Location
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  const profileId = req.query.id.toString();
  const { bio, experience } = req.body;

  const session = await getSession({ req })

  const result = await prisma.profile.upsert({
    where: {
      userId: profileId,
    },
    update: {
      experience: experience,
      bio: bio
    },
    create: {
      experience: experience,
      bio: bio,
      userId: profileId
    }
  });
  console.log(result);
  res.json(result);
}
