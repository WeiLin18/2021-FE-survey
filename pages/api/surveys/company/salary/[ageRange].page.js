import nc from "next-connect";
import Surveys from "models/Surveys";
import db from "utils/db";
import { INDUSTRY_LIST, SALARY_LIST } from "constants/survey";

const handler = nc();

handler.get(async (req, res) => {
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

  const _getFormatIndustryGroup = (list) => {
    const industryList = INDUSTRY_LIST.map((str) => {
      const obj = list.find((item) => item._id === str);
      return (
        obj || {
          _id: str,
          count: 0,
        }
      );
    });

    const __getOtherIndustryCount = () => {
      let otherCount = 0;
      list.forEach((item) => {
        if (INDUSTRY_LIST.includes(item._id)) return;
        otherCount += item.count;
      });
      return otherCount;
    };

    return [
      ...industryList,
      {
        _id: "其他產業",
        count: __getOtherIndustryCount(),
      },
    ];
  };

  const _getIndustry = async (salaryValue, salaryCount) => {
    if (salaryCount === 0) return _getFormatIndustryGroup([]);

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

    return _getFormatIndustryGroup(industryGroup);
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
    industry: _getFormatIndustryGroup(hightSalaryGroup),
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
