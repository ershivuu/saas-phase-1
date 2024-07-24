import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  AppBar,
  CssBaseline,
  Divider,
  Typography,
  Collapse,
} from "@mui/material";
import {
  Menu,
  Dashboard as DashboardIcon,
  Poll as PollIcon,
  People as PeopleIcon,
  LocationOn as LocationOnIcon,
  Report as ReportIcon,
  ImportExport as ImportExportIcon,
  ExpandLess,
  ExpandMore,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import Logo from "../../assets/logos/medi-logo.png";
import "./Sidenav.css";

const Sidenav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState("");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDropdownToggle = (item) => {
    setOpenDropdown(openDropdown === item ? "" : item);
  };

  const drawer = (
    <div>
      <List sx={{ mt: 10 }}>
        {[
          { text: "Dashboard", icon: <DashboardIcon /> },
          {
            text: "White Label",
            icon: <PollIcon />,
            subItems: [
              { text: "Edit Header", path: "/surveys-overview" },
              { text: "Edit Home Page", path: "/survey-reports" },
              { text: "Home Section 1", path: "/survey-reports" },
              { text: "Home Section 2", path: "/survey-reports" },
              { text: "Home Section 3", path: "/survey-reports" },
              { text: "Home Section 4", path: "/survey-reports" },
              { text: "Home Section 5", path: "/survey-reports" },
              { text: "Edit Faq's", path: "/survey-reports" },
              { text: "Edit Interview Schedule", path: "/survey-reports" },
              { text: "Edit Contact", path: "/survey-reports" },
              { text: "Edit Footer", path: "/survey-reports" },
            ],
          },
          { text: "Master Current Opening", icon: <PeopleIcon /> },
          { text: "Update Job Profiles", icon: <LocationOnIcon /> },
          { text: "Master Interview Schedule", icon: <ReportIcon /> },
          {
            text: "Reports",
            icon: <PollIcon />,
            subItems: [
              { text: "Applied Candidates", path: "/surveys-overview" },
            ],
          },
          { text: "Visitors Report", icon: <ImportExportIcon /> },
          {
            text: "Master List",
            icon: <PollIcon />,
            subItems: [
              { text: "Post Applied For", path: "/surveys-overview" },
              { text: "Sub Post Applied For", path: "/surveys-overview" },
              { text: "Departments", path: "/surveys-overview" },
              { text: "Exam Type", path: "/surveys-overview" },
              { text: "Degree", path: "/surveys-overview" },
              { text: "Categories", path: "/surveys-overview" },
              { text: "Add Subject", path: "/surveys-overview" },
            ],
          },
          { text: "Register Admin", icon: <ImportExportIcon /> },
          {
            text: "Super Admin",
            icon: <PollIcon />,
            subItems: [
              { text: "Admin list", path: "/surveys-overview" },
              { text: "Rights List", path: "/surveys-overview" },
              { text: "Role List", path: "/surveys-overview" },
            ],
          },
        ].map((item, index) => (
          <div key={item.text}>
            <ListItem
              button
              onClick={() => item.subItems && handleDropdownToggle(item.text)}
              component={NavLink}
              to={
                item.subItems
                  ? "#"
                  : `/${item.text.toLowerCase().replace(" ", "-")}`
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {sidebarOpen && <ListItemText primary={item.text} />}
              {item.subItems ? (
                openDropdown === item.text ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null}
            </ListItem>
            {item.subItems && (
              <Collapse
                in={openDropdown === item.text}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItem
                      button
                      key={subItem.text}
                      component={NavLink}
                      to={subItem.path}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={subItem.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
          color: "black",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            edge="start"
            onClick={handleSidebarToggle}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            <img className="new-admin-logo" src={Logo} alt="Logo" />
          </Typography>
          <IconButton color="inherit" aria-label="logout" sx={{ ml: 2 }}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: sidebarOpen ? 240 : 60,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: sidebarOpen ? 240 : 60,
              overflowX: "hidden",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </nav>
    </div>
  );
};

export default Sidenav;
