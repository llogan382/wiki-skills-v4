import React, {useEffect, useState} from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { Interests, User } from "@prisma/client";
import Link from "next/link";
import Image from 'next/image';
import moment from 'moment';
import { showExperience } from "../lib/utilities";

export type ProfileProps = {
  interest: Interests;
  user: User;
  experience: Date;
};

const Post: React.FC<{ post: ProfileProps }> = ({ post }) => {

// TODO: Change date format for experience
  const showDate = new Date(post.experience).toDateString();

  // const whatsThis = new Date(post.experience);
  // const rightNow = new Date();

  const today = new moment();
  const past = new moment(post.experience); // remember this is equivalent to 06 01 2010
  //dates in js are counted from 0, so 05 is june
  var a = moment.duration(today.diff(past))
  console.log(a) // returns Tue Jun 01 2010 was 1143 days 36 months 3 years ago

  const experienceYears = a.asYears();


  return (
    <section>
      <Link
          as={`/interests/${post.user.id}`}
          href="/interests/[post.user.id]"
          >
        {post.user.name}
        <Image
        alt="Vercel logo"
        src={post.user.image}
        width={50}
        height={50}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <div>
        <div>
        {post.interest.title}

        </div>
        <p>

        </p>
        Experience since: {showDate} {showExperience(post.experience)}
      </div>

      </Link>


      <style jsx>{`
        section {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </section>
  );
};

export default Post;
