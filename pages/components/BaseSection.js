import { Grid, Card, Typography, Box, colors } from "@material-ui/core";

import BarChart from "components/BarChart";
import StackBarChart from "components/StackBarChart";
import DoughnutChart from "components/DoughnutChart";
import PieChart from "components/PieChart";
import { COLORS_LIST } from "constants/chart";
import { EDUCATION_LIST } from "constants/survey";
import { getUnitYConfig } from "utils/common";

const BaseSection = ({
  ageData,
  genderData,
  majorData,
  areaData,
  jobTenureData,
  ...props
}) => (
  <Grid container spacing={2} component="section" {...props}>
    <Grid item md={6} sm={12} xs={12}>
      <Card>
        <Typography variant="h5">地區</Typography>
        <Box sx={{ mt: 2 }}>
          <Sub.AreaBar areaData={areaData} />
        </Box>
      </Card>
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <Card>
        <Typography variant="h5">年齡</Typography>
        <Box sx={{ mt: 2 }}>
          <Sub.AgeDoughnut ageData={ageData} />
        </Box>
      </Card>
    </Grid>
    <Grid item md={3} sm={6} xs={12}>
      <Card>
        <Typography variant="h5">性別</Typography>
        <Box sx={{ mt: 2 }}>
          <Sub.GenderPie genderData={genderData} />
        </Box>
      </Card>
    </Grid>
    <Grid item md={9} xs={12}>
      <Card>
        <Typography variant="h5">畢業科系</Typography>
        <Box sx={{ mt: 2 }}>
          <Sub.MajorBar majorData={majorData} />
        </Box>
      </Card>
    </Grid>
    <Grid item xs={12}>
      <Card>
        <Typography variant="h5">年資 & 平均年薪</Typography>
        <Box sx={{ mt: 2 }}>
          <Sub.JobTenureBar jobTenureData={jobTenureData} />
        </Box>
      </Card>
    </Grid>
  </Grid>
);

const Sub = {
  AreaBar: ({ areaData }) => {
    const optionConfig = { scales: { y: getUnitYConfig("人") } };
    const config = {
      labels: areaData.map((v) => v._id),
      datasets: [
        {
          label: "area",
          data: areaData.map((v) => v.count),
          backgroundColor: COLORS_LIST,
        },
      ],
    };
    return (
      <BarChart data={areaData} config={config} optionConfig={optionConfig} />
    );
  },
  AgeDoughnut: ({ ageData }) => {
    const config = {
      labels: ageData.map((v) => v._id),
      datasets: [
        {
          label: "age",
          data: ageData.map((v) => v.count),
          backgroundColor: COLORS_LIST,
        },
      ],
    };
    return <DoughnutChart data={ageData} config={config} />;
  },
  GenderPie: ({ genderData }) => {
    const config = {
      labels: genderData.map((v) => v._id),
      datasets: [
        {
          label: "gender",
          data: genderData.map((v) => v.count),
          backgroundColor: COLORS_LIST,
        },
      ],
    };
    return <PieChart data={genderData} config={config} />;
  },
  MajorBar: ({ majorData }) => {
    const labels = majorData.map((item) => item._id);
    const datasets = EDUCATION_LIST.map((str, index) => {
      const data = majorData.map(
        (majorItem) => majorItem.education[index].count
      );
      return {
        label: str,
        backgroundColor: COLORS_LIST[index],
        data,
      };
    });

    return <StackBarChart data={{ labels, datasets }} isHorizontal />;
  },
  JobTenureBar: ({ jobTenureData }) => {
    const optionConfig = { scales: { y: getUnitYConfig("人") } };
    const config = {
      labels: jobTenureData.map((v) => v._id),
      datasets: [
        {
          label: "年資",
          data: jobTenureData.map((v) => v.count),
          backgroundColor: COLORS_LIST[3],
          order: 1,
        },
        {
          label: "平均年薪(萬)",
          type: "line",
          data: jobTenureData.map((v) => v.averageSalary),
          backgroundColor: COLORS_LIST[1],
          borderColor: COLORS_LIST[1],
          borderDash: [5, 5],
          order: 0,
        },
      ],
    };
    return (
      <BarChart
        data={jobTenureData}
        config={config}
        optionConfig={optionConfig}
      />
    );
  },
};

export default BaseSection;
