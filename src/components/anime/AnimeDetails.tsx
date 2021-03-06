import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import MuiDialogContent from "@material-ui/core/DialogContent"
import MuiDialogActions from "@material-ui/core/DialogActions"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

import { AnimeDetail, Cast, Staff } from "../../interfaces/index"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  })

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string
  children: React.ReactNode
  onClose: () => void
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      { onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null
      }
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

interface AnimeDetailsProps {
  open: boolean
  title: string
  handleDetalisClose: VoidFunction
  animeDetail: AnimeDetail
}

const AnimeDetails = ({ open, handleDetalisClose, title, animeDetail }: AnimeDetailsProps) => {

  return (
    <div>
      <Dialog onClose={handleDetalisClose}  open={open} fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={handleDetalisClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          { animeDetail != null ?
            <>
              <Typography variant="h4" style={{ marginBottom: "0.5rem" }}>
                Staffs
              </Typography>
              { animeDetail.staffs.length > 1 ? animeDetail.staffs.map((staff: Staff, index: number) => (
                  <Typography key={index} variant="body2" gutterBottom>
                    {staff.role}: {staff.name}
                  </Typography>
                )) :
                <Typography variant="body2">
                  ??????????????????????????????????????????
                </Typography>
              }
              <Typography variant="h4" style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
                Casts
              </Typography>
              { animeDetail.casts.length > 1 ? animeDetail.casts.map((cast: Cast, index: number) => (
                  <Typography key={index} variant="body2" gutterBottom>
                    {cast.character}: {cast.name}
                  </Typography>
                )) :
                <Typography variant="body2">
                  ??????????????????????????????????????????
                </Typography>
              }
            </> :
            <Typography variant="body2">
              ??????????????????????????????????????????
            </Typography>
          }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDetalisClose} color="primary">
            ?????????
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AnimeDetails
