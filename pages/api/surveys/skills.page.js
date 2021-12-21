import nc from "next-connect";
import Surveys from "models/Surveys";
import db from "utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const groups = await Surveys.aggregate([
    {
      $project: {
        skills: "$first_job.skill",
      },
    },
    {
      $project: {
        skillArr: { $split: ["$skills", ", "] },
      },
    },
  ]);
  await db.disconnect();

  // add to one bjg array
  let rawTotalData = [];
  groups.forEach((obj) => {
    rawTotalData = [...rawTotalData, ...obj.skillArr];
  });

  const ObjectData = rawTotalData.reduce((acc, word) => {
    if (word in acc) {
      acc[word] += 1;
    } else {
      acc[word] = 1;
    }

    return acc;
  }, {});

  // concat same skill -> "任務指派工具（Trello" + ", " +  "Asana...）"
  const finalData = Object.entries(ObjectData)
    .map(([key, value]) => ({
      text: key,
      value,
    }))
    .reduce((acc, obj) => {
      if (obj.value > 1 && acc[0]?.value === obj.value) {
        const [concatObj] = acc.splice(0, 1);
        return [
          { text: `${concatObj.text},  ${obj.text}`, value: obj.value },
          ...acc,
        ];
      }
      return [obj, ...acc];
    }, [])
    .sort((a, b) => b.value - a.value);

  res.send(finalData);
});

export default handler;
