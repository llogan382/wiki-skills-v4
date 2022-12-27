import React, {useEffect, useState} from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { Interests, User } from "@prisma/client";
import Link from "next/link";
// TODO: Update to show profile info, location

export type ProfileContentProps = {
  content: any;
  profileType: "bio" | "experience" | "contact";
};

const ProfileBody: React.FC<{ content: ProfileContentProps }> = ({ content }) => {



  // const showDate = new Date(post.experience).toUTCString();


  return (
    <section>

    {content}

      <style jsx>{`
      .profileBody{
        border: 2px solid red;
      }

      `}</style>
    </section>
  );
};

export default ProfileBody;
