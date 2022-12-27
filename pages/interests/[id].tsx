import prisma from '../../lib/prisma'
import React from "react";



export default function Post({ post }) {
  return(

    <h2>Hi there</h2>
  )
}



  export async function getStaticPaths() {

    const interestPage = await prisma.user.findMany({
      include: {
        interests: true,
        contact: true
      }
    })


    const showPaths = interestPage.map(pagePath => pagePath)
    // console.log(showPaths)


    const paths = showPaths.map((post) => ({
      params: { id: post.id.toString() },
    }))
    return {
      paths,
      fallback: false, // can also be true or 'blocking'
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
        interests: true,
        contact: true
      }
    })

    const updateReturn = await JSON.parse(JSON.stringify(interestProps));

    return {
      // Passed to the page component as props
      props: { post: {updateReturn} },
    }
  }

