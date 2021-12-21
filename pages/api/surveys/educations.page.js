import nc from "next-connect";
import Surveys from "../../../models/Surveys";
import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const educations = await Surveys.find().distinct("education");
  await db.disconnect();
  res.send(educations);
});

export default handler;
