import nc from "next-connect";
import Surveys from "models/Surveys";
import db from "utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const groups = await Surveys.aggregate([
    {
      $group: { _id: "$company.job_tenure", count: { $sum: 1 } },
    },
    {
      $sort: { count: -1 },
    },
  ]);
  await db.disconnect();

  const formatGroups = groups.map((item) =>
    item?._id ? item : { _id: "未填寫", count: item?.count || 0 }
  );

  res.send(formatGroups);
});

export default handler;
