import React, { useContext, useEffect, useState } from "react";

import IdleTimer from "react-idle-timer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ReportIcon from "@material-ui/icons/Assignment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
//expansion panel
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AppContext from "../context/app-context";
import { useHistory, useLocation } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    marginTop: 65,
  },
  drawerPaperHidden: {
    width: drawerWidth,
    // marginTop: 65,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const context = useContext(AppContext);
  const theme = useTheme();
  const history = useHistory();
  let location = useLocation();
  let pathname = location.pathname.replace(/\d+$/, ":id");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [myReports, setMyReports] = useState([]);
  const [idleTimer, setIdleTimer] = useState(null);

  useEffect(() => {
    const asyncFunc = async () => {
      setMyReports(await context.getMyReports(context.currentUser.id));
    };
    asyncFunc();
  }, []);

  const onAction = (e) => {
    console.log("user did something", e);
  };

  const onActive = (e) => {
    console.log("user is active", e);
    console.log("time remaining", idleTimer.getRemainingTime());
  };

  const onIdle = (e) => {
    context.logout();
  };
  // let re = /\d+$/;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawerContent = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {[
          {
            text: "Home",
            icon: <HomeWorkIcon />,
            route: "/",
            btnFunction: () => history.push("/"),
          },
          {
            text: "Create New Report",
            icon: <ReportIcon />,
            route: `/report/:id`,
            btnFunction: () => context.startReport(context.currentUser),
          },
        ].map((item, index) => (
          <ListItem
            disabled={pathname == item.route ? true : false}
            onClick={item.btnFunction}
            button
            key={item.text}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Recent Reports</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            {myReports
              ? myReports
                  .reverse()
                  .slice(0, 10)
                  .map((report, index) => {
                    //very complicated way of formatting the date into a standardized title
                    let date = new Date(report.created_at);
                    date = date
                      .toLocaleString("en-US")
                      .split(",")[0]
                      .split("/")
                      .map((i) => {
                        if (i.length == 1) {
                          i = "0" + i;
                        }
                        return i;
                      })
                      .join("");
                    const reportTitle = `FHC DAY ${date}`;
                    return (
                      <ListItem
                        button
                        onClick={() => history.push(`/report/${report.id}`)}
                        key={report.created_at}
                      >
                        <ListItemText primary={reportTitle} />
                      </ListItem>
                    );
                  })
              : null}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <IdleTimer
        ref={(ref) => {
          setIdleTimer(ref);
        }}
        element={document}
        onActive={onActive}
        onIdle={onIdle}
        onAction={onAction}
        debounce={250}
        timeout={20 * 60 * 1000}
      />
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaperHidden,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawerContent}
          </Drawer>
          <button onClick={handleDrawerToggle} className="drawer-toggle-btn">
            <ChevronRightIcon fontSize="large" />
          </button>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawerContent}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default ResponsiveDrawer;
