import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://almsrr:MHDMJly7TXmaXMwa@cluster0.hccog.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  if (req.method === "GET") {
    try {
      const id = req.query.meetupId;

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

      res.status(200).json(meetup);
    } catch (error) {
      console.log(error);
      res.status(500);
    } finally {
      client.close();
    }
  } else {
    res.status(501);
  }
}

export default handler;
