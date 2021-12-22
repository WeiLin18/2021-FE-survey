import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Grid, Card, Typography, Box } from "@material-ui/core";
import { css } from "@emotion/css";

import { breakpoints } from "styles";
import { COLORS_LIST } from "constants/chart";
import StackBarChart from "components/StackBarChart";

const style = {
  cloud: css`
    && {
      overflow-x: scroll;
    }
    && svg {
      height: 300px;
    }
    && svg g {
      transform: translate(50%, 50%);
      @media (max-width: ${breakpoints.pad}) {
        transform: translate(40%, 50%);
      }
      @media (max-width: ${breakpoints.pad}) {
        transform: translate(40%, 50%);
      }
    }
  `,
};

const DynamicSkillCloud = dynamic(() => import("./SkillCloud"), { ssr: false });

const AdviceSection = ({ skillData, ...props }) => (
  <Grid container spacing={2} component="section" {...props}>
    <Grid item xs={12} id="skill">
      <Card className={style.cloudCard}>
        <Typography variant="h5">導入技術</Typography>
        <Box sx={{ mt: 2 }} className={style.cloud}>
          <DynamicSkillCloud skillData={skillData?.data} />
        </Box>
      </Card>
    </Grid>
    <Grid item xs={12}>
      <Card>
        <Typography variant="h5">導入技術排名</Typography>
        <Box sx={{ mt: 2 }} className={style.cloud}>
          <Sub.SkillBar
            skillData={skillData?.data}
            length={skillData?.length}
          />
        </Box>
      </Card>
    </Grid>
  </Grid>
);

const Sub = {
  SkillBar: ({ skillData, length }) => {
    const xConfig = useMemo(
      () => ({
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      }),
      []
    );

    if (!skillData) return null;

    const top5Data = skillData.slice(0, 5);
    const data = {
      labels: top5Data.map((v) => v.text),
      datasets: [
        {
          label: "百分比",
          data: top5Data.map((v) => Math.round((v.value / length) * 100)),
          backgroundColor: COLORS_LIST,
        },
      ],
    };
    return <StackBarChart data={data} isHorizontal xConfig={xConfig} />;
  },
};

export default AdviceSection;
