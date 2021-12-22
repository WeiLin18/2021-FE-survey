import React from "react";
import { css } from "@emotion/css";
import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link as ScrollLink } from "react-scroll";
import { colors } from "styles";

const menuItems = [
  {
    path: "base",
    label: "基本",
  },
  {
    path: "company",
    label: "公司",
  },
  {
    path: "industry",
    label: "產業",
  },
  {
    path: "skill",
    label: "技術",
  },
];

const style = {
  root: css`
    && {
      background-color: ${colors.textDefault};
      height: 80px;
      display: flex;
      flex-direction: row;
      padding: 0 20px;
      justify-content: space-between;
      align-items: center;
      box-shadow: none;
      flex
    }
  `,
  subtitle: css`
    && {
      line-height: 1;
    }
  `,
  menu: css`
    && ul {
      background: ${colors.textDefault};
    }
  `,
  menuItem: css`
    && {
      background: ${colors.textDefault};
    }
  `,
  link: css`
    && {
      border: 1px solid #fff;
      display: inline-block;
      color: #fff;
      font-weight: 700;
      border-radius: 16px;
      padding: 0 16px;
      line-height: 40px;
      cursor: pointer;
    }
    &&:not(:last-of-type) {
      margin-right: 12px;
    }
    &&:hover {
      background-color: rgba(256, 256, 256, 0.1);
    }
  `,
};

const AppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <MuiAppBar className={style.root}>
      <Box>
        <Typography color="textSecondary" variant="h4">
          2021 前端問卷調查報告
        </Typography>
        <Typography
          color="textSecondary"
          variant="subtitle1"
          className={style.subtitle}
        >
          2021 Frontend Engineer Survey
        </Typography>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        {menuItems.map(({ path, label }, i) => (
          <ScrollLink
            activeClass="active"
            className={style.link}
            to={path}
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            key={i}
          >
            {label}
          </ScrollLink>
        ))}
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <IconButton
          size="medium"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
          }}
          className={style.menu}
        >
          {menuItems.map(({ path, label }, i) => (
            <MenuItem
              key={i}
              onClick={handleCloseNavMenu}
              className={style.menuItem}
            >
              <ScrollLink
                activeClass="active"
                className={style.link}
                to={path}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                key={i}
              >
                {label}
              </ScrollLink>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </MuiAppBar>
  );
};

export default AppBar;
