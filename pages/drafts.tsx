import React from "react";
import type { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { useSession, getSession } from "next-auth/react";
import prisma from '../lib/prisma'


type Props = {
  props: any;
};

const Drafts: React.FC<Props> = (props) => {
  const {data: session}= useSession()
  // const drafts = props.data;
  // console.log(props.data)
  // const drafts = [...props.data];

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          hello
          {/* {drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))} */}
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


export async function getServerSideProps(context) {

  // const { data: session, status } = getSession()
  // if (!session) {

  //   // res.statusCode = 403;
  //   return { props: { drafts: [] } };
  // }


  const drafts = await prisma.post.findMany({
    // where: {
    //   author: {
    //     email: session.user.email
    //   },
    //   published: false,
    // },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  const data = await JSON.parse(JSON.stringify(drafts))
  return {
    props: {
      data: data
    }
  }

}

export default Drafts;
