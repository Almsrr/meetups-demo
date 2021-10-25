import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const client = await MongoClient.connect(
    "mongodb+srv://almsrr:MHDMJly7TXmaXMwa@cluster0.hccog.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  switch (req.method) {
    case "GET": {
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

        res.status(200).json(foundMeetups);
      } catch (error) {
        console.log(error);
        req.status(500);
      } finally {
        client.close();
        break;
      }
    }

    case "POST": {
      const data = req.body;

      try {
        const meetupsCollection = client.db().collection("meetups");
        const result = await meetupsCollection.insertOne(data);

        res.status(201).json(result);
      } catch (error) {
        console.log(error);
        res.status(500);
      } finally {
        client.close();
        break;
      }
    }
    default: {
      res.status(501);
      client.close();
      break;
    }
  }
};

export default handler;
