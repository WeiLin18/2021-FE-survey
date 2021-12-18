import nc from "next-connect";
import Surveys from "../../models/Surveys";
import db from "../../utils/db";
import axios from "axios";

const handler = nc();

handler.get(async (req, res) => {
  const { data } = await axios.get(
    `https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json`
  );

  await db.connect();

  await Surveys.deleteMany();
  await Surveys.insertMany(data);
  await db.disconnect();
  res.send({ message: "seeded successfully" });
});

export default handler;
