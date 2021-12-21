import React from "react";
import PropTypes from "prop-types";
import { css, cx, keyframes } from "@emotion/css";
import { colors } from "styles";

const bounce = keyframes`
  0%, to {
    transform: translateY(0)
  }

  50% {
    transform: translateY(-10px)
  }
`;

const style = {
  loader: css`
    opacity: 0;
    display: flex;
    width: 100%;
    justify-content: center;
    transition: opacity 0.3s ease-in;
  `,

  loaderShow: css`
    && {
      opacity: 1;
    }
  `,

  circle: css`
    background-color: ${colors.primary};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 5px;
    animation: ${bounce} 0.5s ease-in infinite;
    &:nth-of-type(2) {
      animation-delay: 0.1s;
    }
    &:nth-of-type(3) {
      animation-delay: 0.2s;
    }
  `,
};

const Skelton = ({ isLoaderShow = false, customClassName = "" }) => {
  return (
    <div
      className={
        isLoaderShow
          ? cx(style.loader, style.loaderShow, customClassName)
          : cx(style.loader, customClassName)
      }
    >
      <div className={style.circle}></div>
      <div className={style.circle}></div>
      <div className={style.circle}></div>
    </div>
  );
};

Skelton.propTypes = {
  isLoaderShow: PropTypes.bool,
  customClassName: PropTypes.string,
};

export default Skelton;
