import { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { chartDefaultOptions, chartHeight } from "configs/chart";

const DoughnutChart = ({ height = chartHeight, data, config, ...props }) => {
  const [chartData, setChartData] = useState(undefined);

  useEffect(() => {
    if (!data) return;
    setChartData(config);
  }, [data, config]);

  return (
    <Box sx={{ height: height }}>
      {chartData && (
        <Doughnut
          data={chartData}
          options={{
            ...chartDefaultOptions,
            plugins: {
              legend: {
                display: true,
                position: "bottom",
              },
            },
          }}
          {...props}
        />
      )}
    </Box>
  );
};

export default DoughnutChart;
