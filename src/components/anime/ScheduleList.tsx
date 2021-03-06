import React from "react"

import { makeStyles, Theme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import Container from "@material-ui/core/Container"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import CloseIcon from "@material-ui/icons/Close"
import Slide from "@material-ui/core/Slide"
import { TransitionProps } from "@material-ui/core/transitions"

import { Schedule } from "../../interfaces/index"

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
    marginTop: "2rem"
  },
  table: {
    minWidth: 650
  }
}))

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface ScheduleListProps {
  open: boolean
  schedule: Schedule[]
  handleScheduleClose: VoidFunction
}

const ScheduleList = ({ open, schedule, handleScheduleClose }: ScheduleListProps) => {
  const classes = useStyles()

  return (
    <>
      <Dialog
        fullScreen
        PaperProps={{
          style: {
            backgroundColor: "#F5F5F5"
          },
        }}
        open={open}
        onClose={handleScheduleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleScheduleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              ??????????????????????????????
            </Typography>
            <Button autoFocus color="inherit" onClick={handleScheduleClose}>
              ?????????
            </Button>
          </Toolbar>
        </AppBar>
        <Container className={classes.container}>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="medium" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>?????????</TableCell>
                  <TableCell>????????????</TableCell>
                  <TableCell>????????????</TableCell>
                  <TableCell>???????????????</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { schedule != null && schedule.length >= 1 ? schedule.map((program) => (
                    <TableRow key={program.title}>
                      <TableCell component="th" scope="row">
                        {program.title}
                      </TableCell>
                      <TableCell>{program.st_time.replace(":00 +0900", "")}</TableCell>
                      <TableCell>{program.ed_time.replace(":00 +0900", "")}</TableCell>
                      <TableCell>{program.ch_name}</TableCell>
                    </TableRow>
                  )) :
                  <TableRow>
                    <TableCell component="th" scope="row">
                      ??????????????????????????????????????????????????????
                    </TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Dialog>
    </>
  )
}

export default ScheduleList
