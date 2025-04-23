import React, { useContext, useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { LoginContext } from "./LoginContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const drawerWidth = 300;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#000000",
}));

const mdTheme = createTheme();

export interface DashboardProps {
  children: React.ReactNode;
  title: string;
  refreshAction: () => void;
}

function Dashboard(props: DashboardProps) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("LoginContext must be used within a LoginContext.Provider");
  }
  const { user } = context;

  const navigation = useNavigate();

  const [time, setTime] = useState<Date>(new Date());
  const [refreshInterval, setRefreshInterval] = useState(0);
  const [refreshString, setRefreshString] = useState("manual");

  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
  const [refreshAnchorEl, setRefreshAnchorEl] = useState<null | HTMLElement>(null);
  const openUserMenu = Boolean(userAnchorEl);
  const openRefreshMenu = Boolean(refreshAnchorEl);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserAnchorEl(null);
  };

  const handleUserMenuItemClick = (index: number) => {
    handleUserMenuClose();
    switch (index) {
      case 0:
        navigation("/password");
        break;
      case 1:
        navigation("/login");
        break;
      default:
        break;
    }
  };

  const handleRefreshMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setRefreshAnchorEl(event.currentTarget);
  };

  const handleRefreshMenuClose = () => {
    setRefreshAnchorEl(null);
  };

  const refreshStrings = ["manual", "1s", "5s", "10s", "60s"];

  const handleRefreshMenuItemClick = (index: number) => {
    handleRefreshMenuClose();
    switch (index) {
      case 0:
        setRefreshInterval(0);
        setRefreshString(refreshStrings[index]);
        break;
      case 1:
        setRefreshInterval(1000);
        setRefreshString(refreshStrings[index]);
        break;
      case 2:
        setRefreshInterval(5000);
        setRefreshString(refreshStrings[index]);
        break;
      case 3:
        setRefreshInterval(10000);
        setRefreshString(refreshStrings[index]);
        break;
      case 4:
        setRefreshInterval(60000);
        setRefreshString(refreshStrings[index]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (refreshInterval === 0) {
      console.log("refreshInterval is 0");
      return;
    }
    const interval = setInterval(() => setTime(new Date()), refreshInterval);
    return () => {
      console.log("clear refreshInterval");
      clearInterval(interval);
    };
  }, [refreshInterval]);

  useEffect(() => {
    console.log("reload page at", time.toISOString());
    props.refreshAction();
  }, [time]);

  const handleRefreshClick = () => {
    props.refreshAction();
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Sidebar isOpen={open} />
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="toggle sidebar"
              onClick={toggleDrawer}
              sx={{
                marginRight: "12px",
              }}
            >
              <MenuIcon />
            </IconButton>
            <img
              src="/orange_logo.svg"
              alt="Orange Logo"
              style={{
                height: "42px",
                marginRight: "20px",
                // Removed the filter temporarily to see if that's causing issues
                // filter: 'brightness(0) invert(1)'
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ fontSize: "1.5rem" }} // Increase size from default h6
              >
                {props.title}
              </Typography>
              <Box
                component="div"
                onClick={handleRefreshMenuOpen}
                aria-controls={openRefreshMenu ? "refresh-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openRefreshMenu ? "true" : undefined}
                sx={{
                  ml: 2,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 12px",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <Typography variant="body1" color="inherit">
                  Refresh: {refreshString}
                </Typography>
              </Box>
              <Menu
                id="refresh-menu"
                anchorEl={refreshAnchorEl}
                open={openRefreshMenu}
                onClose={handleRefreshMenuClose}
                MenuListProps={{
                  "aria-labelledby": "refresh-button",
                }}
              >
                {refreshStrings.map((option, index) => (
                  <MenuItem
                    key={option}
                    selected={option === refreshString}
                    onClick={() => handleRefreshMenuItemClick(index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <IconButton
              onClick={handleUserMenuClick}
              size="small"
              aria-controls={openUserMenu ? "user-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openUserMenu ? "true" : undefined}
              sx={{ ml: 2 }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "primary.main",
                  color: "white",
                }}
              >
                {user?.username?.charAt(0)?.toUpperCase() || "U"}
              </Avatar>
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={userAnchorEl}
              open={openUserMenu}
              onClose={handleUserMenuClose}
              MenuListProps={{
                "aria-labelledby": "user-button",
              }}
            >
              <MenuItem onClick={() => handleUserMenuItemClick(0)}>Change Password</MenuItem>
              <MenuItem onClick={() => handleUserMenuItemClick(1)}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  {props.children}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
