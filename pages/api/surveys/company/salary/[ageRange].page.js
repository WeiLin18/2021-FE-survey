import nc from "next-connect";
import NextCors from "nextjs-cors";
import Surveys from "models/Surveys";
import db from "utils/db";
import { SALARY_LIST } from "constants/survey";
import { getFormatIndustryGroup } from "utils/common";

const handler = nc();

handler.get(async (req, res) => {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const { ageRange } = req.query; //21~25 歲
  const formatAgeRange = decodeURIComponent(ageRange);
  const filterAgeRange = formatAgeRange === "all" ? "" : formatAgeRange;

  await db.connect();
  const rawCommonSalaryGroup = await Surveys.aggregate([
    {
      $match: {
        $and: [
          { "company.salary": { $in: SALARY_LIST } },
          filterAgeRange ? { age: { $eq: filterAgeRange } } : {},
        ],
      },
    },
    {
      $group: {
        _id: "$company.salary",
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ]);

  const commonSalaryGroup = SALARY_LIST.map((str) => {
    return (
      rawCommonSalaryGroup.find((item) => item?._id === str) || {
        _id: str,
        count: 0,
      }
    );
  });

  const hightSalaryGroup = await Surveys.aggregate([
    {
      $match: {
        $and: [
          { "company.salary": { $nin: SALARY_LIST } },
          filterAgeRange ? { age: { $eq: filterAgeRange } } : {},
        ],
      },
    },
    {
      $group: {
        _id: "$company.industry",
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ]);

  const _getIndustry = async (salaryValue, salaryCount) => {
    if (salaryCount === 0) return getFormatIndustryGroup([]);

    const industryGroup = await Surveys.aggregate([
      {
        $match: {
          $and: [
            { "company.salary": salaryValue },
            filterAgeRange ? { age: { $eq: filterAgeRange } } : {},
          ],
        },
      },
      {
        $group: {
          _id: "$company.industry",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    return getFormatIndustryGroup(industryGroup);
  };

  const _getSalaryGroupsWithIndustry = async (array) => {
    return Promise.all(
      array.map(async (item) => ({
        ...item,
        industry: await _getIndustry(item._id, item.count),
      }))
    );
  };

  const commonSalaryGroupWithIndustry = await _getSalaryGroupsWithIndustry(
    commonSalaryGroup
  );

  await db.disconnect();

  const _getCount = (array) => {
    if (array?.length < 1) return { count: 0 };
    const { count: sum } = array.reduce((prev, curr) => ({
      count: prev.count + curr.count,
    }));
    return sum;
  };

  const hightSalaryItem = {
    _id: "120 萬以上",
    count: _getCount(hightSalaryGroup),
    industry: getFormatIndustryGroup(hightSalaryGroup),
  };

  let lowSalaryItem;
  const commonSalaryData = commonSalaryGroupWithIndustry
    .filter((item) => {
      if (item._id.includes("以下")) {
        lowSalaryItem = item;
        return false;
      }
      return true;
    })
    .sort(
      (prev, curr) =>
        Number(prev._id.split("~")[0]) - Number(curr._id.split("~")[0])
    );

  res.send([lowSalaryItem, ...commonSalaryData, hightSalaryItem]);
});

export default handler;
