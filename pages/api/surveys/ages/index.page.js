import nc from "next-connect";
import Surveys from "../../../../models/Surveys";
import db from "../../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const groups = await Surveys.aggregate([
    {
      $group: { _id: "$age", count: { $sum: 1 } },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
  await db.disconnect();
  res.send(groups);
});

export default handler;
