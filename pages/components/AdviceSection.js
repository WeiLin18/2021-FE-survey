import { Grid, Card, Typography, Box } from "@material-ui/core";

import WordCloud from "react-d3-cloud";
import { css } from "@emotion/css";
import { breakpoints } from "styles";

const style = {
  cloud: css`
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
const AdviceSection = ({ skillData, ...props }) => (
  <Grid container spacing={2} component="section" {...props}>
    <Grid item xs={12}>
      <Card>
        <Typography variant="h5">導入技術</Typography>
        <Box sx={{ mt: 2 }} className={style.cloud}>
          <Sub.SkillCloud skillData={skillData} />
        </Box>
      </Card>
    </Grid>
  </Grid>
);

const Sub = {
  SkillCloud: ({ skillData }) => {
    if (!skillData) return null;
    const renderData = skillData.map((item) => {
      const rawValue = item?.value;
      return {
        ...item,
        value: rawValue < 10 ? rawValue * 20 : rawValue * 2,
      };
    });
    return (
      typeof window !== "undefined" && (
        <WordCloud
          width={200}
          height={60}
          data={renderData}
          font="Noto Sans TC"
          fontWeight={700}
          spiral="rectangular"
          // fontSize={(word) => word.value}
          rotate={0}
          padding={0}
        />
      )
    );
  },
};

export default AdviceSection;
