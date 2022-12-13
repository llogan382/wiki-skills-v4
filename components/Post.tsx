import React, {useEffect, useState} from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

// TODO: Update to show profile info, location

// TODO: Update to show contact only if user is signed in.
export type ProfileProps = {
  showInterest: string;
  showUser: string;
  showPayments: string[];
};

const Post: React.FC<{ post: ProfileProps }> = ({ post }) => {
  return (
    <section>
      <div>
        {post.showInterest}
      </div>
      <div>
        {post.showUser}
      </div>
      <ul>
    {post.showPayments.map(item =>
      (<li key={item}>
      {item}
      </li>)
      )
    }
      </ul>

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
