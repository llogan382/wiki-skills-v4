import React from "react";
import type { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { ProfileProps } from "../components/Post";
import prisma from '../lib/prisma'
import Router from "next/router";
import Link from "next/link";

import Image from "next/image";


// TODO: Make search.


// TODO: Finish this landing page

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="page">
        <main>

          <section className="header">
        <div className="container">
            <nav>
                <div className="logo"><h1>Mask Coder</h1></div>
                <div className="navbar">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">about us</a></li>
                        <li><a href="#">contact us</a></li>
                    </ul>
                </div>
            </nav>

            <div className="hero">
                <div className="hero-content">
                    <div className="hero-header">This is website is awesome</div>
                    <p className="hero-desc">
                        This website has some subtext that goes here under the main title. It's a smaller font and the color is lower
                    </p>
                    <button className="btn">Sign up</button>
                </div>
    <Image
      src={"https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}
      width={'117'}
      height='80'
      alt="banner Image"
    />
            </div>
        </div>
    </section>
    <section className="about">
        <div className="container padding-lr">
            <div className="about-header">
                <h1>About us</h1>
            </div>
            <div className="about-content">
                <div className="box">
                    <div className="box-img">

                        <Image
                        className={'image'}
                        src={"https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=640&h=750&dpr=1"}
                        // width='640'
                        // height='750'
                        fill
                        alt="image1"

/>
                      </div>
                    <p>this is some subtext under an illustration or image</p>
                </div>
                <div className="box">
                    <div className="box-img">
                    <Image
                    className={'image'}
                        src={"https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=640&h=750&dpr=1"}
                        // width='640'
                        // height='750'
                        fill
                        alt="image1"

/>
                      </div>
                    <p>this is some subtext under an illustration or image</p>
                </div>
                <div className="box">
                    <div className="box-img">
                    <Image
                    className={'image'}
                        src={"https://images.pexels.com/photos/196659/pexels-photo-196659.jpeg?auto=compress&cs=tinysrgb&w=640&h=750&dpr=1"}
                        // width='640'
                        // height='750'
                        fill
                        alt="image1"

/>
                      </div>
                    <p>this is some subtext under an illustration or image</p>
                </div>
                <div className="box">
                    <div className="box-img">
                    <Image
                    className={'image'}
                        src={"https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=640&h=750&dpr=1"}
                        // width='640'
                        // height='750'
                        fill
                        alt="image1"

/>
</div>
                    <p>this is some subtext under an illustration or image</p>
                </div>
            </div>
        </div>
    </section>



        </main>

      </div>
      <style jsx>{`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
}

body {
    font-family: 'Public Sans', sans-serif;
}

.padding-lr {
    padding: 40px 30px;
}

.padding-lg {
    padding: 60px 40px;
}

.padding-tb {
    padding: 50px 0;
}

.container {
    max-width: 1024px;
    margin: 0 auto;
}

.header {
    background: #1f2937;
}

nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
}

nav .logo {
    font-size: 24px;
    color: #f9faf8;
}

nav .navbar ul {
    display: flex;
    list-style: none;
}

nav .navbar ul li {
    margin-right: 15px;
}

nav .navbar ul li:last-child {
    margin-right: 0;
}

nav .navbar ul li a {
    text-decoration: none;
    font-size: 18px;
    color: #e5e7eb;
}

/** End Navbar **/

.hero {
    padding: 100px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
}

.hero .hero-content  {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.hero .hero-content .hero-header {
    font-size: 48px;
    font-weight: bold;
    color: #f9faf8;
}

.hero .hero-content .hero-desc {
    font-size: 20px;
    color: #f9faf8;
    margin: 15px 0;
}

.hero .hero-img {
    flex: 1;
}

.hero .hero-img img {
    width: 100%;
}

.hero .hero-content .btn {
    display: block;
    padding: 10px 30px;
    border-radius: 5px;
    border: none;
    background-color: #3882f6;
    color: #f9faf8;
    font-size: 18px;
    font-weight: 300;
    text-transform: uppercase;
}

/** End Hero **/

.about {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.about-header {
    text-align: center;
    margin-bottom: 30px;
    font-size: 36px;
    color: #1f2937;
    text-transform: uppercase;
    font-weight: bold;
}

.about-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

.about-content .box {
    flex: 1;
    text-align: center;
}

.about-content .box {
    width: 100%;
}

/** End About **/

.box-img{
  position: relative;
  /* overflow: 'hidden'; */
  /* position: 'fixed'; */

  /* width: 100%; */
  height: 250px;
  /* > div {
    position: unset !important;
  } */


}
.image {
    object-fit: contain;
    /* width: 100% !important; */
    /* position: relative !important; */
    /* height: unset !important; */
  }
.slogan {
    background-color: #e5e7eb;
}

.slogan-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
}

.slogan-content .slogan-text {
    font-size: 30px;
    font-weight: lighter;
    font-style: italic;
    color: #1f2937;
}

.slogan-content .author {
    font-size: 18px;
    font-weight: bold;
    color: #1f2937;
    align-self: flex-end;
}

.footer-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 30px;
    gap: 200px;
    background-color: #3882f6;
    border-radius: 5px;
}

.footer-header {
    font-size: 20px;
    color: #f9faf8;
}

.footer-desc {
    font-size: 18px;
    color: #e5e7eb;
    font-weight: lighter;
}

.footer-btn .secondary-btn {
    display: block;
    padding: 10px 40px;
    background-color: transparent;
    border: 2px solid #f9faf8;
    border-radius: 10px;
    font-size: 15px;
    color: #e5e7eb;
    text-transform: uppercase;
    font-weight: bold;
}


      `}</style>
    </Layout>
  );
};

export default Home;
