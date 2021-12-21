import nc from "next-connect";
import Surveys from "models/Surveys";
import db from "utils/db";
import { EDUCATION_LIST } from "constants/survey";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const top4MajorGroup = await Surveys.aggregate([
    {
      $group: {
        _id: "$major",
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 4,
    },
  ]);
  // eslint-disable-next-line no-unused-vars
  const [top1Major, top2Major, top3Major, top4Major] = top4MajorGroup;
  // top2Major -> 非資訊、設計、語言科系相關(歷史、會計、國貿) should filter

  const otherMajorEducationGroups = await Surveys.aggregate([
    {
      $match: {
        $and: [
          { major: { $ne: top1Major._id } },
          { major: { $ne: top3Major._id } },
          { major: { $ne: top4Major._id } },
        ],
      },
    },
    {
      $group: {
        _id: "$education",
        count: { $sum: 1 },
      },
    },
  ]);

  const _getFormatEducationGroup = (list) =>
    EDUCATION_LIST.map((str) => {
      const educationItem = list.find((item) => item._id === str);
      return educationItem || { _id: str, count: 0 };
    });

  const _getEducation = async (majorValue) => {
    const educationGroup = await Surveys.aggregate([
      {
        $match: {
          major: majorValue,
        },
      },
      {
        $group: {
          _id: "$education",
          count: { $sum: 1 },
        },
      },
    ]);

    return _getFormatEducationGroup(educationGroup).sort(
      (a, b) => a._id > b._id
    );
  };

  const _getMajorGroupsWithEducation = async (array) => {
    return Promise.all(
      array.map(async (item) => ({
        ...item,
        education: await _getEducation(item._id),
      }))
    );
  };

  const top3MajorGroupWithEducation = await _getMajorGroupsWithEducation([
    top1Major,
    top3Major,
    top4Major,
  ]);

  const otherMajorWithEducation = {
    _id: "其他科系",
    ...otherMajorEducationGroups.reduce((prev, curr) => ({
      count: prev.count + curr.count,
    })),
    education: _getFormatEducationGroup(otherMajorEducationGroups),
  };

  await db.disconnect();
  res.send([...top3MajorGroupWithEducation, otherMajorWithEducation]);
});

export default handler;
