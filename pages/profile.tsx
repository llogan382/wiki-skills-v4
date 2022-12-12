import React from "react";
import type { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { useSession, getSession } from "next-auth/react";
import prisma from '../lib/prisma'

type Props = {
  props: any;
};

const Profile: React.FC<Props> = (props) => {
  const {data: session}= useSession()

  const userId = session?.id;
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {

        await fetch(`/api/profile/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
        "Cross-Origin-Resource-Policy": "cross-origin"
      }
      });

    } catch (error) {
      console.error(error);
    }
  };



  if (!session) {
    return (
      <Layout>

        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Profile</h1>
        <main>
        <button onClick={submitData}>
          Send Profile
        </button>
          {/* {drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))} */}
        </main>
        <div>
          Hello
          <div>
            {console.log(userId)}
          </div>
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


export default Profile;
