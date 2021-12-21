import nc from "next-connect";
import Surveys from "models/Surveys";
import db from "utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const groups = await Surveys.aggregate([
    {
      $project: {
        tenure: "$company.job_tenure",
        salarySplit: { $split: ["$company.salary", "~"] },
      },
    },
    { $unwind: "$salarySplit" },
    {
      $project: {
        tenure: "$tenure",
        salaryArr: { $split: ["$salarySplit", " "] },
      },
    },
    {
      $project: {
        tenure: "$tenure",
        salary: { $arrayElemAt: ["$salaryArr", 0] },
      },
    },
    {
      $group: {
        _id: "$tenure",
        count: { $sum: 1 },
        totalAmount: {
          $sum: {
            $toInt: "$salary",
          },
        },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);
  await db.disconnect();

  /**@TODO use $avg */

  const formatGroups = groups.map((item) =>
    item?._id
      ? {
          ...item,
          averageSalary: parseInt(item?.totalAmount / item?.count + 5),
        }
      : {
          _id: "未填寫",
          averageSalary: parseInt(item?.totalAmount / item?.count + 5),
          count: item?.count || 0,
        }
  );

  res.send(formatGroups);
});

export default handler;
