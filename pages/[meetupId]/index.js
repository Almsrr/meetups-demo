import { Fragment } from "react";
import Head from "next/head";
import { getAllMeetups, getMeetup } from "../../mongo/methods";

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
  const meetups = await getAllMeetups();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup.id },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const selectedMeetup = await getMeetup(meetupId);

  return {
    props: {
      selectedMeetup,
    },
  };
}

export default Detail;
