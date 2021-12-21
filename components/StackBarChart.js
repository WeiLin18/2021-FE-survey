import { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { chartDefaultOptions, chartHeight } from "configs/chart";

const StackBarChart = ({
  height = chartHeight,
  data,
  isHorizontal = false,
  xConfig = {},
  yConfig = {},
  ...props
}) => {
  const [chartData, setChartData] = useState(undefined);

  useEffect(() => {
    if (!data) return;
    setChartData(data);
  }, [data]);

  return (
    <Box sx={{ height: height }}>
      {chartData && (
        <Bar
          data={chartData}
          options={{
            ...chartDefaultOptions,
            indexAxis: isHorizontal ? "y" : "x",
            scales: {
              x: {
                stacked: true,
                ...xConfig,
              },
              y: {
                stacked: true,
                ...yConfig,
              },
            },
          }}
          {...props}
        />
      )}
    </Box>
  );
};

export default StackBarChart;
