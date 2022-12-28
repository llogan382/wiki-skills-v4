import React, {useEffect, useState} from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { Interests, User } from "@prisma/client";
import Link from "next/link";
// TODO: Update to show profile info, location
import ProfileBody from "./ProfileContent";

export type ProfileProps = {
  interest?: Interests;
  user?: User;
  experience?: Date;
};

const ProfileCard: React.FC<{ userProp: ProfileProps }> = ({ userProp }) => {




  // const showDate = new Date(post.experience).toUTCString();

  const placeHolder = "Gingerbread oat cake wafer biscuit bear claw bonbon. Jelly muffin marshmallow marshmallow sesame snaps tiramisu bonbon. Cake fruitcake tootsie roll brownie icing dragée candy tootsie roll pastry. Wafer cotton candy brownie caramels candy canes caramels jelly beans carrot cake icing. Soufflé chocolate bar topping sweet tart tiramisu chocolate bar. Jelly beans sweet pudding chocolate bar soufflé powder pie dragée apple pie. Ice cream gummies marshmallow gummies gummi bears. Oat cake chocolate bar jelly-o sesame snaps tiramisu carrot cake. Tart apple pie jelly powder cheesecake cake gingerbread danish. Marshmallow sugar plum carrot cake gummi bears jelly beans danish jelly jelly beans carrot cake. Marshmallow shortbread cookie bear claw bonbon cake topping chocolate bar jujubes. Caramels apple pie cookie tart cheesecake.";
  const [userContent, setUserContent] = useState(placeHolder);

  return (
    <section className="profileCard">
      <div className="banner">
        Banner
      </div>
      <div>
        <img className="profileImage" src={userProp.user.image} alt="" srcset="" />
      </div>
      <div>
      {userProp.user.name}
      </div>
      <div className="link">

    Link
      </div>
      <div className="profileTab">
      <button onClick={()=> {setUserContent(userProp.user.bio)}}>
    Profile Tab
</button>
      </div>
      <div className="contactTab">
      <button onClick={()=> {setUserContent(userProp.user.bio)}}>
    Contact Tab
</button>
      </div>

      <div className="experiencetab">
      <button onClick={()=> {setUserContent(userProp.user.bio)}}>
    Experience Tab
</button>
      </div>
      <div className="profileContent">
          <ProfileBody content={userContent} />
      </div>



      <style jsx>{`
        .profileCard {
          color: inherit;

          height: 100%;
          display: grid;
          grid-template-rows: 20% 75px 75px auto;
          grid-template-areas:
          "banner banner banner"
          "profile name link"
          "profiletab experiencetab contacttab"
          "content content content"
        }
        .profileImage{
          border-radius: 50%;
          width: 125px;
          grid-area: profile;
    transform: translate(50px, -75px);
        }
        .banner{
          grid-area: banner;
          /* Created with https://www.css-gradient.com */
background: #8AE95A;
background: -webkit-linear-gradient(top left, #8AE95A, #6E7E84);
background: -moz-linear-gradient(top left, #8AE95A, #6E7E84);
background: linear-gradient(to bottom right, #8AE95A, #6E7E84);
        }
        .link{
          grid-area: link;
        }
        .profileTab {
          grid-area: profiletab;
        }
        .experienceTab{
          grid-area: experiencetab;
        }
        .profileContent{
          grid-area: content
        }

      `}</style>
    </section>
  );
};

export default ProfileCard;
