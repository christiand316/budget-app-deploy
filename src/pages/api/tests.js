import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = session.user.id;
  if(session) {
    return res.status(200).json( userId )
  }

  try {
    const userPosts = await prisma.post.findMany({
      where: {
        userId,
      },
    });

    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving posts' });
  }
}
