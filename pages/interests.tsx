import React from "react";
import type { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { useSession, getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";


interface IFormInput {
  userId: Number;
  interests: String;
  experience?: Date;
  experienceDetails?: String;
}

type Props = {
  props: any;
};



// TODO: Create image
const Interest: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  const userId = session?.id;


  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {

    try {
      await fetch(`/api/interests/${userId}`, {
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

  if (!session) {
    return (
      <Layout>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  // TODO: Add location to form
  return (
    <Layout>
      <div className="page">
        <h1>My Interests</h1>
        <main>

          <h2>Tell us about your interests</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
          <label>Interests</label>
            <input  {...register("interests")} />
            <label>When did you start?</label>
            <input type="date"
                {...register("experience", {
                  valueAsDate: true,
                })}
              />
          <label>Is there anything special to share? Credentials, etc?</label>
            <input  {...register("experienceDetails")} />
            <input type="submit" />

          </form>
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

export default Interest;
