import React, {useEffect, useState} from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { Interests, User } from "@prisma/client";
import Link from "next/link";
import { it } from "node:test";
// TODO: Update to show profile info, location

export type ProfileContentProps = {
  content: any;
  profileType: "bio" | "experience" | "contact";
};

const ProfileBody: React.FC<{ content: ProfileContentProps }> = ( {props} ) => {



  const [content, setContent] = useState(props.content);
  function checkProps(item){
    if(item.profileType == "experience"){
      setContent(item.content.map(i => {
        const experienceSince = new Date(i.experience).toUTCString()
        return(
          <div key={i.interestId}>
            <p>interest: {i.interest.title}</p>

            <p> Experience Since: {experienceSince}</p>
          </div>
        )
      }));
    }

    if(item.profileType == "contact"){
      console.log(item.content)

      const contactVals = Object.entries(item.content);
      setContent(contactVals.map(i => {
        if(i[0] === "userIdForContact"){
          return
        }
        return(
          <div key={i[0]}>
            <strong>{i[0]}: </strong> {i[1]}

          </div>
        )
      }
      ));

    }
  }

      useEffect(() => {
        checkProps(props)
      }, [props]);


  return (
    <section>

  <h2>Content</h2>
  <div>
    {content}

  </div>

      <style jsx>{`
      .profileBody{
        border: 2px solid red;
      }

      `}</style>
    </section>
  );
};

export default ProfileBody;
