import React from "react";
import type { GetServerSideProps, GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { ProfileProps } from "../components/Post";
import prisma from '../lib/prisma'
import Router from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'


export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  console.log(res)
  return {
    props: {
      session: await unstable_getServerSession(req, res, authOptions)
    }
  }
};


const Test = (props) => {
  {console.log(props)}

  return (
    <Layout>
      <div className="page">

        <h2>Test</h2>
        <p>

        </p>


      </div>
    </Layout>
  );
};


export default Test;
