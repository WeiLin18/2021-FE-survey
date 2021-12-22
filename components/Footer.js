import React from "react";
import { Box, Link, Typography } from "@material-ui/core";
import { css } from "@emotion/css";

import { colors } from "styles";

const style = {
  root: css`
    height: 120px;
    padding: 40px 0 20px 0;
    background: ${colors.textDefault};
    display: flex;
    justify-content: center;
  `,
  text: css`
    color: #fff;
  `,
  license: css`
    color: #fff;
    width: 100%;
    display: inline-block;
    text-align: center;
  `,
};

const Footer = () => {
  return (
    <footer className={style.root}>
      <Box>
        <div>
          <Typography className={style.text}>
            Source Data：
            <Link
              variant="body2"
              color="textSecondary"
              href="https://github.com/hexschool/2021-ui-frontend-job"
              underline="hover"
            >
              六角學院 2021 年前端/UI 從業人員現況問卷調查
            </Link>
          </Typography>
        </div>
        <Typography variant="caption" className={style.license}>
          © 2021 Copyright{" "}
          <Link
            variant="body2"
            color="textSecondary"
            href="https://github.com/WeiLin18"
            underline="hover"
          >
            Wei Lin
          </Link>
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
