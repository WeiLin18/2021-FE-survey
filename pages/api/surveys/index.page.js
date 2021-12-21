import nc from "next-connect";
import Surveys from "../../../models/Surveys";
import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const surveys = await Surveys.find();
  await db.disconnect();
  res.send(surveys);
});

export default handler;
