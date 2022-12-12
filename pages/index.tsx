import React from "react";
import type { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { ProfileProps } from "../components/Post";
import prisma from '../lib/prisma'
import Router from "next/router";

// TODO: Add Signup
// TODO: Edit user interests
// TODO: Add Location
export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.interests.findMany({
    include: {
      User: {
        select: {
          email: true,
          name: true,
          payments: true
        }
      }
    }
  })
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: any[];
};

// TODO: Get all interests by user for feed
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

  const showFeed = props.feed.map(item => {
    const showResults = { showInterest: item.title,
    showUser: item.User[0].name,
    showPayments: item.User[0].payments

    }
    return(
      showResults
    )
  });
  // Array of Interests is passed in. Each interests has array of users.

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <button onClick={sendInterests}>
    Send Interests
        </button>
        <div>
    {
      console.log(showFeed)
    }
        </div>
        <main>
          {showFeed.map((post) => (
            <div key={post.showInterest} className="post">
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
