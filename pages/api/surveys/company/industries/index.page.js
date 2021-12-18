import nc from "next-connect";
import Surveys from "models/Surveys";
import db from "utils/db";
const handler = nc();

handler.get(async (req, res) => {
  const { limit, skip } = req?.query;
  await db.connect();
  const groups = await Surveys.aggregate([
    {
      $group: { _id: "$company.industry", count: { $sum: 1 } },
    },
    {
      $sort: { count: -1 },
    },
    limit
      ? {
          $limit: Number(limit),
        }
      : {},
    skip
      ? {
          $skip: Number(skip),
        }
      : {},
  ]);
  await db.disconnect();

  res.send(groups);
});

export default handler;
