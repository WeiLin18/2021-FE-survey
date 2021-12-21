import mongoose from "mongoose";

const surveySchema = new mongoose.Schema(
  {
    job: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: String, required: true },
    education: { type: String, required: true },
    major: { type: String, required: true },
    // major: { type: String, required: true, unique: true },
    first_job: {
      tenure: String,
      leave: String,
      position: String,
      skill: String,
      render: String,
    },
    works: {
      window: String,
      market: String,
    },
    company: {
      industry: String,
      score: String,
      work: String,
      area: String,
      scale: String,
      people: String,
      job_tenure: String,
      salary: String,
      salary_score: String,
      industry_message: String,
    },
  },
  {
    timestamps: true,
  }
);

const Survey =
  mongoose.models.Surveys || mongoose.model("Surveys", surveySchema);
export default Survey;
