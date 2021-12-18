import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { chartDefaultOptions, chartHeight } from "configs/chart";
import { Box } from "@material-ui/core";

const BarChart = ({
  height = chartHeight,
  data,
  config,
  optionConfig = {},
  ...props
}) => {
  const [chartData, setChartData] = useState(undefined);

  useEffect(() => {
    if (!data) return;
    setChartData(config);
  }, [data, config]);

  return (
    <Box sx={{ height: height }}>
      {chartData && (
        <Bar
          data={chartData}
          options={{
            ...chartDefaultOptions,
            plugins: {
              legend: {
                display: false,
              },
            },
            ...optionConfig,
          }}
          {...props}
        />
      )}
    </Box>
  );
};

export default BarChart;
