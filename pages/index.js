import Head from "next/head";
import { Fragment } from "react";
import axios from "axios";

import MeetupsList from "../components/meetups/MeetupList";

function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Visit our site to view all meetups you are invited"
        />
      </Head>
      <MeetupsList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  // const response = await fetch("/api/meetups");
  const response = await axios.get("http://localhost:3000/api/meetups");
  const loadedMeetups = response.data;

  return {
    props: { meetups: loadedMeetups },
    revalidate: 60000,
  };
}

// export async function getServerSideProps(context) {
//   const res = context.res;
//   const req = context.req;

//   return {
//     props: { meetups: someMeetups },
//   };
// }

export default Home;
