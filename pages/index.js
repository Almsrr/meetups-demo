import Head from "next/head";
import { Fragment } from "react";

import MeetupsList from "../components/meetups/MeetupList";
import { getAllMeetups } from "../mongo/methods";

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

export async function getStaticProps() {
  const loadedMeetups = await getAllMeetups();

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
