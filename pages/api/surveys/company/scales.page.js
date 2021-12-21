import nc from "next-connect";
import Surveys from "models/Surveys";
import db from "utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const groups = await Surveys.aggregate([
    {
      $group: { _id: "$company.scale", count: { $sum: 1 } },
    },
  ]);
  await db.disconnect();

  const _getCount = (string) =>
    string
      .split("人")
      .find((val) => val !== "")
      .split("~")[0];

  const sortedGroups = groups.sort((prev, curr) => {
    const prevCount = _getCount(prev._id);
    const currCount = _getCount(curr._id);
    return currCount - prevCount;
  });

  res.send(sortedGroups);
});

export default handler;
