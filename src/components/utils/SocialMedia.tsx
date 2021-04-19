import { makeStyles, Theme } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"

import TwitterIcon from "@material-ui/icons/Twitter"
import InstagramIcon from "@material-ui/icons/Instagram"
import FacebookIcon from "@material-ui/icons/Facebook"

const useStyles = makeStyles((theme: Theme) => ({
  snsIcon: {
    width: "30px",
    height: "30px",
    color: "#fff",

    [theme.breakpoints.down("xs")]: {
      width: "25px",
      height: "25px"
    }
  }
}))

const SocialMedia: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid item container spacing={2} justify="center">
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href=""
      >
        <TwitterIcon
          className={classes.snsIcon}
        />
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href=""
      >
        <InstagramIcon
          className={classes.snsIcon}
        />
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href=""
      >
        <FacebookIcon
          className={classes.snsIcon}
        />
      </Grid>
    </Grid>
  )
}

export default SocialMedia
