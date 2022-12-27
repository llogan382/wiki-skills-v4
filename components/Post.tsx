import React, {useEffect, useState} from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { Interests, User } from "@prisma/client";
import Link from "next/link";
// TODO: Update to show profile info, location

export type ProfileProps = {
  interest: Interests;
  user: User;
  experience: Date;
};

const Post: React.FC<{ post: ProfileProps }> = ({ post }) => {


  const showDate = new Date(post.experience).toUTCString();


  return (
    <section>
      <Link
          as={`/interests/${post.user.id}`}
          href="/interests/[post.user.id]"
          >
        {post.user.name}

          </Link>
      <div>
        {post.user.name}
      </div>
      <div>
        {post.interest.title}
      </div>
      <div>
        Experience since: {showDate}
      </div>



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
