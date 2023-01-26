import React, { useEffect, useState } from "react";
import type { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { useSession, getSession } from "next-auth/react";
import {prisma} from "../lib/prisma";
import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import useSWR from 'swr';
import {SignedUpload} from '../components/CloudinaryUploadWidget'




interface IFormInput {
  userId: String;
  bio?: String;
  payments?: String;
  experience?: String;
  street1?: String;
  street2?: String;
  city?: String;
  state?: String;
  zipcode?: Number;
  interests?: String;
  phone?: String;
  faceTime?: String;
  email?: String;
  text?: String;
  linkedIn?: String;
  facebook?: String;
  twitter?: String;
  instagram?: String;
  tikTok?: String;
  youtube?: String;

}

type Props = {
  props: any;
};



// TODO: Create image
const Profile: React.FC<Props> = () => {
  const { data: session } = useSession();

  // @ts-ignore
  // const userId = session?.user?.id;
  // const userId = 1;


// TODO: Load user data in form on page load, to show what is in the DB
  const { register, handleSubmit } = useForm<IFormInput>();






  const onSubmit: SubmitHandler<IFormInput> = async (data) => {

    try {

      await fetch(`/api/profile/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cross-Origin-Resource-Policy": "cross-origin",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Show current profile calues

  // function showProfile(bioData){
  //   for (const [key, value] of Object.entries(bioData)) {

  //     console.log(`${key}: ${value}`);
  //   }

  //   return
  // }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Bio</label>
            <input  {...register("bio")} />
            <label>Payments</label>


            <select {...register("payments")}>
        <option value="Venmo">Venmo</option>
        <option value="Paypal">Paypal</option>
        <option value="ApplePay">ApplePay</option>
        <option value="Check">Check</option>
      </select>
            <label>Street</label>
            <input  {...register("street1")} />
            <label>Street 2</label>
            <input  {...register("street2")} />
            <label>City</label>
            <input  {...register("city")} />
            <label>State</label>
            <input  {...register("state")} />
            <label>Zipcode</label>
            <input  {...register("zipcode")} />

<label> phone</label>
<input {...register("phone")} />
<label> faceTime</label>
<input {...register("faceTime")} />
<label> email</label>
<input {...register("email")} />
<label> text</label>
<input {...register("text")} />
<label> linkedIn</label>
<input {...register("linkedIn")} />
<label> facebook</label>
<input {...register("facebook")} />
<label> twitter</label>
<input {...register("twitter")} />
<label> instagram</label>
<input {...register("instagram")} />
<label> tikTok</label>
<input {...register("tikTok")} />

<label> youtube</label>
<input {...register("youtube")} />
<label htmlFor="avatar">Choose a profile picture:</label>

<SignedUpload />


            <input type="submit" />
          </form>
          <div>
      {/* {userProfile ? showProfile(userProfile) : } */}


          </div>
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
  return {
    props: {
      session: await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
      ),
    },
  }
}

export default Profile;


