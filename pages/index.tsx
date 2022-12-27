import React from "react";
import type { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { ProfileProps } from "../components/Post";
import prisma from '../lib/prisma'
import Router from "next/router";
import Link from "next/link";
import ProfileCard from "../components/ProfileCard";

// TODO: Add Location
export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.usersOnInterests.findMany({
    orderBy: {
      experience: 'asc'
    },
    include: {
      user: true,
      interest: true
    }

  });

  const updateReturn = await JSON.parse(JSON.stringify(feed));
  return {
    props: { updateReturn }
  };
};

type Props = {
  feed: any[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <main>
        <h1>Public Feed</h1>

{/* TODO: Fix hydration error */}
           {props.updateReturn.map((post) => (
            <div key={post.userId} className="post">
              <Link href={`/interests/${post.userId}`}>

              <Post post={post} />
              </Link>
            </div>
          ))}
        </main>
        <div className="profileCard">
          {/* TODO: Show the first profile by default */}
            <ProfileCard userProp={props.updateReturn[0]}/>
        </div>

      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
