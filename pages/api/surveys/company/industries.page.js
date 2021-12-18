import nc from "next-connect";
import Surveys from "models/Surveys";
import db from "utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const industries = await Surveys.find()
    .select("company")
    .find()
    .select("industry");
  await db.disconnect();
  res.send(industries);
});

export default handler;
