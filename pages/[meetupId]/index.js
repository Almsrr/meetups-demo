import { Fragment } from "react";
import Head from "next/head";
import axios from "axios";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function Detail(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.selectedMeetup.title}</title>
        <meta name="description" content={props.selectedMeetup.description} />
      </Head>
      <MeetupDetail
        title={props.selectedMeetup.title}
        image={props.selectedMeetup.image}
        address={props.selectedMeetup.address}
        description={props.selectedMeetup.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const response = await axios.get("http://localhost:3000/api/meetups");
  const meetups = response.data;

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup.id },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const url = `/api/meetups/${meetupId}`;

  const response = await axios.get(url);
  const selectedMeetup = response.data;
  return {
    props: {
      selectedMeetup,
    },
  };
}

export default Detail;
