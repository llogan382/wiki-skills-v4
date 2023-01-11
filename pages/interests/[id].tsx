import prisma from '../../lib/prisma'

import React, {useEffect, useState} from "react";
import Layout from '../../components/Layout';
import ProfileBody from "../../components/ProfileContent";

export default function Post({ post }) {

  const [userContent, setUserContent] = useState({content: post.updateReturn.bio, profileType: "bio"});

  return (
    <Layout>

    <section className="profileCard">
      <div className="banner">
        Banner
      </div>
      <div>
        <img className="profileImage" src={post.updateReturn.image} alt="" srcSet="" />
      </div>
      <div>
      {post.updateReturn.name}
      </div>
      <div className="link">

    Link
      </div>
      <div className="profileTab">
      <button onClick={()=> {setUserContent({content: post.updateReturn.bio, profileType: "bio"})}}>
    Profile Tab
</button>
      </div>
      <div className="contactTab">
      <button onClick={()=> {setUserContent({content: post.updateReturn.contact, profileType: "contact"})}}>
    Contact Tab
</button>
      </div>

      <div className="experiencetab">
      <button onClick={()=> {setUserContent({content: post.updateReturn.interests, profileType: "experience"})}}>
    Experience Tab
</button>
      </div>
      <div className="profileContent">
          <ProfileBody props={userContent}/>
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
    </Layout>

  )
}


  export async function getStaticPaths() {

    const interestPage = await prisma.user.findMany({
    })
    const showPaths = interestPage.map(pagePath => pagePath)
    const paths = showPaths.map((post) => ({
      params: { id: post.id.toString() },
    }))
    return {
      paths: [],
      fallback: 'blocking', // can also be true or 'blocking'
    }
  }

  // `getStaticPaths` requires using `getStaticProps`
  export async function getStaticProps({params}) {
    const interestId = await Number(params.id);
    const interestProps = await prisma.user.findUnique({
      where: {
        id: interestId,
      },
      include: {
        interests: {
          include: {
            interest: true
          }
        },
        contact: true,
      },
    })

    const updateReturn = await JSON.parse(JSON.stringify(interestProps));

    return {
      // Passed to the page component as props
      props: { post: {updateReturn} },
      revalidate: 10,
    }
  }

