import { createMeetup } from "../../mongo/methods";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const response = await createMeetup(data);

    res.status(201).json(response);
  }
};

export default handler;
