import React, {useEffect, useState} from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { Interests, User } from "@prisma/client";
import Link from "next/link";
import { it } from "node:test";
import { signOut, useSession } from "next-auth/react";

// TODO: Update to show profile info, location

export type ProfileContentProps = {
  content: any;
  profileType: string;
};

const ProfileBody: React.FC<{ props: ProfileContentProps }> = ( {props} ) => {

  const {data: session, status} = useSession();



  const [content, setContent] = useState(props.content);
  function checkProps(item){
    if(item.profileType == "experience"){
      setContent(item.content.map(i => {
        const experienceSince = new Date(i.experience).toUTCString()
        return(
          <div key={i.interestId}>
          <div>
            <p>interest: {i.interest.title}</p>
            <p>Since: {experienceSince}</p>
          </div>
          </div>

        )
      }));
      return
    }

    if(item.profileType == "contact"){
      if(!session){
        setContent('You must be signed in to view contact info');
        return
      }
      if(item.content !== null){
      const contactVals = Object.entries(item.content);
        setContent(contactVals.map(i => {
          if(i[0] === "userIdForContact"){
            return
          }
          return(
            <p key={i[0]}>
              {i[0]}:  {i[1]}
            </p>

          )
        }
        ));
        return
      }
      setContent('No contact info was added')
    }
    if(item.content){
      setContent(item.content)
      return
    } else {

      setContent('No Bio info was entered')
    }
  }

      useEffect(() => {
        checkProps(props)
      }, [props]);


  return (
    <section>
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
