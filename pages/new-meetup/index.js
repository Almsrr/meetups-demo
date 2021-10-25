import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

import NewMeetupFrom from "../../components/meetups/NewMeetupForm";

function NewMeetup() {
  const router = useRouter();

  const addMeetupHandler = async (newMeetup) => {
    const response = await axios.post("/api/new-meetup", newMeetup);

    if (response.status === 201) {
      alert("Meetup inserted successfully");
      router.push("/");
    }
  };
  return (
    <Fragment>
      <Head>
        <title>New Meetup</title>
        <meta name="description" content="You can add our first meetup" />
      </Head>{" "}
      <NewMeetupFrom onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetup;
