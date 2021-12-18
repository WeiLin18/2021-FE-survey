import nc from "next-connect";
import Surveys from "models/Surveys";
import db from "utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const groups = await Surveys.aggregate([
    {
      $group: { _id: "$company.area", count: { $sum: 1 } },
    },
    {
      $sort: { count: -1 },
    },
  ]);
  await db.disconnect();

  let aboardGroups = [];
  const taiwanGroups = groups.filter((item) => {
    if (item._id.includes("台灣")) {
      return true;
    } else {
      aboardGroups.push(item);
      return false;
    }
  });
  const aboardItem = {
    _id: "海外",
    ...aboardGroups.reduce((a, b) => ({
      count: a.count + b.count,
    })),
  };

  res.send([...taiwanGroups, aboardItem]);
});

export default handler;
