import React, { useState } from "react"
import clsx from "clsx"

import { makeStyles, useTheme, Theme } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"

import { Container, Grid, Typography } from "@material-ui/core"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import SearchIcon from "@material-ui/icons/Search"
import ScheduleIcon from "@material-ui/icons/Schedule"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Link from "@material-ui/core/Link"
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"

import Schedule from "../anime/Schedule"
import ScrollUp from "../utils/ScrollUp"
import SocialMedia from "../utils/SocialMedia"
import { fetchSchedule } from "../../lib/api"

const drawerWidth = 300

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  logo: {
    flexGrow: 1
  },
  siteTitle: {
    color: "#fff"
  },
  searchBox: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#fff"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth,
    marginTop: "6rem"
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  footer: {
    backgroundColor: theme.palette.primary.main,
    width: `100%`,
    position: "relative",
    overflow: "hidden",
    marginTop: "6em",
    padding: "2em 0 "
  },
  gridContainer: {
    margin: "1.5em 0"
  },
  copylight: {
    marginTop: "15px",
    color: "#fff",
    fontSize: "1em"
  }
}))

interface PageTemplateProps {
  children: React.ReactNode
  fetchAnimesDataByTitle: Function
  setLoading: Function
}

const PageTemplate: React.FC<PageTemplateProps> = ({ children, fetchAnimesDataByTitle, setLoading }) => {
  const classes = useStyles()
  const theme = useTheme()

  const [title, setTitle] = useState("")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [schedule, setSchedule] = useState<Schedule[]>([])

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const handleScheduleOpen = () => {
    setScheduleOpen(true)
  }

  const handleScheduleClose = () => {
    setScheduleOpen(false)
  }

  const fetchTodaySchedule = async () => {
    setSchedule(await fetchSchedule(1))
  }

  return (
    <>
      <header className={classes.header}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: drawerOpen,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open-drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, drawerOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h2" className={classes.logo}>
              <Link href="/"
                className={classes.siteTitle}
                underline="none"
              >
                Anime DB
              </Link>
            </Typography>
            <FormControl>
              <TextField
                id="title-search"
                className={classes.searchBox}
                size="small"
                variant="outlined"
                placeholder="作品名で検索"
                value={title}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="disabled" />
                    </InputAdornment>
                  ),
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value)
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    setLoading(true)
                    fetchAnimesDataByTitle(title)
                  }
                }}
              />
            </FormControl>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => {
                fetchTodaySchedule()
                handleScheduleOpen()
              }}
            >
              <ListItemIcon>{<ScheduleIcon />}</ListItemIcon>
              <ListItemText primary="本日のアニメ放送予定" />
            </ListItem>
          </List>
          <Schedule
            open={scheduleOpen}
            schedule={schedule}
            handleScheduleClose={handleScheduleClose}
          />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: drawerOpen,
          })}
        >
          {children}
        </main>
      </header>
      <ScrollUp />
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Grid className={classes.gridContainer} container direction="column">
            <SocialMedia />
          </Grid>
          <Grid
            item
            container
            justify="center"
          >
            <Typography className={classes.copylight}>
              &copy;2021 Anime DB
            </Typography>
          </Grid>
        </Container>
      </footer>
      <style jsx global>
        {`
          html,
          body {
            background: #F5F5F5;
            overflow-x: hidden;
            padding: 0 !important;
          }
          #__next {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          main {
            flex: 1;
          }
        `}
      </style>
    </>
  )
}

export default PageTemplate
