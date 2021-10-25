import { MongoClient, ObjectId } from "mongodb";

const getAllMeetups = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://almsrr:MHDMJly7TXmaXMwa@cluster0.hccog.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  try {
    const meetupsCollection = client.db().collection("meetups");
    const meetups = await meetupsCollection.find().toArray();

    const foundMeetups = meetups.map((meetup) => {
      return {
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      };
    });
    return foundMeetups;
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

const getMeetup = async (id) => {
  const client = await MongoClient.connect(
    "mongodb+srv://almsrr:MHDMJly7TXmaXMwa@cluster0.hccog.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  try {
    const meetupsCollection = client.db().collection("meetups");
    const selectedMeetup = await meetupsCollection.findOne({
      _id: ObjectId(id),
    });

    const meetup = {
      id: selectedMeetup._id.toString(),
      title: selectedMeetup.title,
      image: selectedMeetup.image,
      address: selectedMeetup.address,
      description: selectedMeetup.description,
    };

    return meetup;
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

const createMeetup = async (newMeetup) => {
  const client = await MongoClient.connect(
    "mongodb+srv://almsrr:MHDMJly7TXmaXMwa@cluster0.hccog.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  try {
    const meetupsCollection = client.db().collection("meetups");
    const result = await meetupsCollection.insertOne(newMeetup);

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

export { getAllMeetups, getMeetup, createMeetup };
