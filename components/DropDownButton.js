import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { css } from "@emotion/css";
import clx from "classnames";
import { colors } from "styles";

const style = {
  button: css`
    && {
      padding: 0 20px;
      display: flex;
      justify-content: center;
      min-width: 100px;
      border-radius: 16px;
      border: 1px solid ${colors.textDefault};
    }
    &&&:hover {
      background-color: rgba(0, 32, 74, 0.04);
      box-shadow: none;
    }
  `,
  buttonIcon: css`
    margin-left: auto;
  `,
};

const menuClasses = {
  paper: css`
    && {
      margin-top: 1px;
    }
    & .MuiList-root {
      max-height: 408px;
    }
  `,
};

export const DropDownButton = ({
  labelName,
  currentItem,
  onItemClick,
  list,
  customClassName,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (item) => {
    onItemClick && onItemClick(item);
    handleClose();
  };

  return (
    <>
      <Button
        id={`${labelName}-button`}
        aria-controls={`${labelName}-menu`}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableRipple
        onClick={handleClick}
        variant="contained"
        color="secondary"
        className={clx(style.button, customClassName)}
        {...props}
      >
        {currentItem?.name || labelName}
        {open ? (
          <KeyboardArrowUp className={style.buttonIcon} />
        ) : (
          <KeyboardArrowDown className={style.buttonIcon} />
        )}
      </Button>
      <Menu
        elevation={0}
        id={`${labelName}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        MenuListProps={{
          "aria-labelledby": `${labelName}-button`,
        }}
        classes={menuClasses}
      >
        {list?.length > 0 &&
          list.map((item) => (
            <MenuItem
              value={item.value}
              key={item.value}
              onClick={() => {
                handleItemClick(item);
              }}
            >
              {item.name}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

DropDownButton.propTypes = {
  labelName: PropTypes.string,
  currentItem: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }),
  onItemClick: PropTypes.func,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  customClassName: PropTypes.string,
};

DropDownButton.defaultProps = {
  labelName: "",
  currentItem: { name: "", value: "" },
  onItemClick: () => {},
  list: [{ name: "", value: "" }],
  customClassName: "",
};

export default DropDownButton;
