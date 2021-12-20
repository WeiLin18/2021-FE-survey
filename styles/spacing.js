import { css } from "@emotion/css";

const spacingUnit = 4;

const generateSpacingStyle = (level = 20) => {
  let spacings = {};
  for (let i = 1; i < level; i++) {
    spacings[`pt_${i}`] = css`
      &&& {
        padding-top: ${spacingUnit * i}px;
      }
    `;
    spacings[`pb_${i}`] = css`
      &&& {
        padding-bottom: ${spacingUnit * i}px;
      }
    `;
    spacings[`pl_${i}`] = css`
      &&& {
        padding-left: ${spacingUnit * i}px;
      }
    `;
    spacings[`pr_${i}`] = css`
      &&& {
        padding-right: ${spacingUnit * i}px;
      }
    `;
    spacings[`mt_${i}`] = css`
      &&& {
        margin-top: ${spacingUnit * i}px;
      }
    `;
    spacings[`mb_${i}`] = css`
      &&& {
        margin-bottom: ${spacingUnit * i}px;
      }
    `;
    spacings[`ml_${i}`] = css`
      &&& {
        margin-left: ${spacingUnit * i}px;
      }
    `;
    spacings[`mr_${i}`] = css`
      &&& {
        margin-right: ${spacingUnit * i}px;
      }
    `;
    spacings[`mx_${i}`] = css`
      &&& {
        margin-left: ${spacingUnit * i}px;
        margin-right: ${spacingUnit * i}px;
      }
    `;
  }
  return spacings;
};

const MuiSpacing = (value) => value * spacingUnit;
const spacings = generateSpacingStyle(20);

export { MuiSpacing, spacings };
