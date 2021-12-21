import colors from "./colors";

const button = {
  root: {
    height: "48px",
    minWidth: "60px",
    borderRadius: "16px",
    whiteSpace: "nowrap",
    padding: "0 16px",
    fontWeight: 500,
    "&&": {
      boxShadow: "none",
    },
  },
  label: {
    fontSize: "16px",
    fontWeight: 500,
  },
  outlined: {
    borderColor: colors.textPrimary,
  },
  contained: {
    "&&:hover": {
      boxShadow: "0px 2px 10px -1px rgb(0 0 0 / 20%)",
    },
    "&&:active": {
      boxShadow: "0px 2px 10px -1px rgb(0 0 0 / 20%)",
    },
  },
  containedPrimary: {
    "&&": {
      backgroundColor: colors.primary,
    },
    "&&:hover": {
      backgroundColor: colors.blueFade,
    },
  },
  containedSecondary: {
    "&&": {
      color: colors.textPrimary,
      backgroundColor: "#fff",
    },
  },
};

export default button;
