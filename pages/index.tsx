import React from "react";
import type { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { ProfileProps } from "../components/Post";
import {prisma} from '../lib/prisma'
import Router from "next/router";
import Link from "next/link";


// TODO: Make a landing page.

// TODO: Make search.

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
    props: {
      updateReturn,
    },
    revalidate: 10,
  }
};

type Props = {
  [x: string]: any;
  feed: any[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <main>
        <h1>Public Feed</h1>


           {props.updateReturn.map((post) => (
            <div key={post.userId} className="post">

              <Post post={post} />

            </div>
          ))}
        </main>

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
