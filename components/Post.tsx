import React, {useEffect, useState} from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type ProfileProps = {
  id: number;
  name: string;
  email: string;
};

const Post: React.FC<{ post: ProfileProps }> = ({ post }) => {
  return (
    <section>
      <div>
        {post.name}
      </div>
      <div>
        {post.email}
      </div>
      {/* <ul>
    {post.payments.map(item =>
      (<li key={item}>
      {item}
      </li>)
      )
    }
      </ul> */}

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
