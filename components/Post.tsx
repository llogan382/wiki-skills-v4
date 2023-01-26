import React, { useEffect, useState } from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { Interests, User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { showExperience } from "../lib/utilities";

export type ProfileProps = {
  interest: Interests;
  user: User;
  experience: Date;
};

const Post: React.FC<{ post: ProfileProps }> = ({ post }) => {
  const showDate = new Date(post.experience).toDateString();

  const today = moment();
  const past = moment(post.experience); // remember this is equivalent to 06 01 2010
  //dates in js are counted from 0, so 05 is june
  var a = moment.duration(today.diff(past));
  console.log(a); // returns Tue Jun 01 2010 was 1143 days 36 months 3 years ago

  const experienceYears = a.asYears();

  return (
    <section>
      <div className="post-grid">
        <Link className="profile-link" href={`/interests/${post.user.id}`}>{post.user.name}</Link>
    <div className="post-user-image">

        <Image
          alt="Vercel logo"
          src={post.user.image}
          width={70}
          height={70}
          // style={{
          //   maxWidth: "100%",
          //   height: "auto",
          // }}
        />
    </div>

        <div className="post-interest">{post.interest.title}</div>
      </div>
      <div>
        Experience since: {showDate} {showExperience(post.experience)}
      </div>

      <style jsx>{`
        section {
          color: inherit;
          padding: 2rem;
        }
        .post-grid{
          display: grid;
          width: 40%;
          grid-template-columns: 60% 40%;
          grid-template-areas:
          "user-name profileimage"
          "interest profileimage"
        }
        .profile-link{
          grid-area: user-name;
        }
        .post-user-image{
          grid-area: profileimage;
          justify-self: center;
        }
        .post-interest{
          grid-area: interest;
        }
      `}</style>
    </section>
  );
};

export default Post;
