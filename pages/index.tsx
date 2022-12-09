import React from "react";
import type { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { ProfileProps } from "../components/Post";
import prisma from '../lib/prisma'
import Router from "next/router";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.user.findMany();
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: ProfileProps[];
};

const Blog: React.FC<Props> = (props) => {

  const sendInterests = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = {
      payments: "cash",
      interests: "scuba",
    }
    const JSONdata = JSON.stringify(data)

      const sendData = await fetch(`/api/profile`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      });
      const result = await sendData.json()
      console.log(result)
  };


  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <button onClick={sendInterests}>
    Send Interests
        </button>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
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
