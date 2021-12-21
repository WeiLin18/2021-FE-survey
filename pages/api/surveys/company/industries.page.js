import nc from "next-connect";
import Surveys from "models/Surveys";
import db from "utils/db";
import { getFormatIndustryGroup } from "utils/common";
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const groups = await Surveys.aggregate([
    {
      $group: { _id: "$company.industry", count: { $sum: 1 } },
    },
    {
      $sort: { count: -1 },
    },
  ]);
  await db.disconnect();

  const groupWithRank = groups.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  res.send({
    data: groupWithRank,
    formatData: getFormatIndustryGroup(groupWithRank),
  });
});

export default handler;
