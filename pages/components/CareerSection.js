import { useCallback, useMemo, useState } from "react";
import { Grid, Card, Typography, Box } from "@material-ui/core";
import useSWR from "swr";

import { COLORS_LIST } from "constants/chart";
import { AGE_LIST, DISPLAY_INDUSTRY_LIST } from "constants/survey";
import BarChart from "components/BarChart";
import DoughnutChart from "components/DoughnutChart";
import StackBarChart from "components/StackBarChart";
import PieChart from "components/PieChart";
import DropDownButton from "components/DropDownButton";
import { getUnitYConfig } from "utils/common";

const CareerSection = ({ workData, ...props }) => {
  return (
    <Grid container spacing={1} {...props}>
      <Grid item xs={12}>
        <Sub.SalaryInteractiveCard />
      </Grid>
      <Grid item md={6} sm={6} xs={12}>
        <Card>
          <Typography variant="h5">辦公型態</Typography>
          <Box sx={{ mt: 2 }}>
            <Sub.WorkPie workData={workData} />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

const ageList = [
  { name: "全部", value: "all" },
  ...AGE_LIST.map((str) => ({ name: str, value: str })),
];

const Sub = {
  WorkPie: ({ workData }) => {
    const config = {
      labels: workData.map((v) => v._id),
      datasets: [
        {
          label: "age",
          data: workData.map((v) => v.count),
          backgroundColor: COLORS_LIST,
        },
      ],
    };
    return <PieChart data={workData} config={config} />;
  },
  SalaryInteractiveCard: () => {
    const [ageRange, setAgeRange] = useState(ageList[0]);

    const ageRangeValue = useMemo(() => ageRange?.value, [ageRange?.value]);

    return (
      <Card>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">年薪 & 產業分佈</Typography>
          <DropDownButton
            labelName="ageRange"
            currentItem={ageRange}
            list={ageList}
            onItemClick={(item) => {
              setAgeRange(item);
            }}
            style={{ width: 130 }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Sub.SalaryStackBar ageRangeValue={ageRangeValue} />
        </Box>
      </Card>
    );
  },
  SalaryStackBar: ({ ageRangeValue }) => {
    const { data: salaryData, error } = useSWR(
      ageRangeValue
        ? [
            `${process.env.MONGODB_API_URL}/api/surveys/company/salary/`,
            encodeURIComponent(ageRangeValue),
          ]
        : null,
      (url, query) => fetch(url + query).then((r) => r.json())
    );

    const isSalaryData = salaryData?.length > 0;

    const labels = isSalaryData
      ? salaryData.map((item) => item?._id)
      : undefined;
    const datasets = isSalaryData
      ? DISPLAY_INDUSTRY_LIST.map((str, index) => {
          const data = salaryData?.map(
            (salaryItem) => salaryItem.industry[index].count
          );
          return {
            label: str,
            backgroundColor: COLORS_LIST[index],
            data,
          };
        })
      : undefined;

    const yConfig = useMemo(
      () => ({
        max: ageRangeValue === "all" ? 120 : 55,
        ...getUnitYConfig("人"),
      }),
      [ageRangeValue]
    );

    return (
      <Box sx={{ height: 300 }}>
        {error && <Typography align="center">server is busy...</Typography>}
        {salaryData && (
          <StackBarChart data={{ labels, datasets }} yConfig={yConfig} />
        )}
      </Box>
    );
  },
};

export default CareerSection;
