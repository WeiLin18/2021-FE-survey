import { Box, Typography } from "@material-ui/core";
import CountUp from "react-countup";
import { fetcher } from "utils/common";
import BaseSection from "./components/BaseSection";
import CareerSection from "./components/CareerSection";
import AdviceSection from "./components/AdviceSection";
import AppBar from "components/AppBar";
import Footer from "components/Footer";

const HomePage = ({ data }) => {
  return (
    <>
      <AppBar />
      <Box
        sx={{ px: 5, maxWidth: 1200, mx: "auto", pt: "80px", pb: "40px" }}
        component="main"
      >
        <Box sx={{ p: 10 }} component="header">
          <Typography variant="h5" align="center">
            本問卷共累積{" "}
            <CountUp start={0} end={481} duration={2.5} separator="," /> 份
          </Typography>
        </Box>
        <BaseSection {...data?.baseSection} />
        <CareerSection {...data?.careerSection} />
        <AdviceSection {...data?.adviceSection} />
      </Box>
      <Footer />
    </>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  try {
    const ageData = await fetcher(
      `${process.env.MONGODB_API_URL}/api/surveys/ages`
    );
    const genderData = await fetcher(
      `${process.env.MONGODB_API_URL}/api/surveys/genders`
    );
    const majorData = await fetcher(
      `${process.env.MONGODB_API_URL}/api/surveys/majors`
    );
    const areaData = await fetcher(
      `${process.env.MONGODB_API_URL}/api/surveys/company/areas`
    );
    const jobTenureData = await fetcher(
      `${process.env.MONGODB_API_URL}/api/surveys/company/job_tenures`
    );
    const workData = await fetcher(
      `${process.env.MONGODB_API_URL}/api/surveys/company/works`
    );
    const industryData = await fetcher(
      `${process.env.MONGODB_API_URL}/api/surveys/company/industries`
    );
    const scaleData = await fetcher(
      `${process.env.MONGODB_API_URL}/api/surveys/company/scales`
    );
    const skillData = await fetcher(
      `${process.env.MONGODB_API_URL}/api/surveys/skills`
    );
    return {
      props: {
        data: {
          baseSection: {
            ageData,
            genderData,
            majorData,
            areaData,
            jobTenureData,
          },
          careerSection: {
            workData,
            industryData,
            scaleData,
          },
          adviceSection: {
            skillData,
          },
        },
      },
      revalidate: 60 * 10,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
