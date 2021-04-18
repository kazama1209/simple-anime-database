import React, { useState } from "react"

import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Chip from "@material-ui/core/Chip"
import CircularProgress from "@material-ui/core/CircularProgress"
import Typography from "@material-ui/core/Typography"

import AnimeDetails from "./AnimeDetails" 
import { fetchAnimeByTid } from "../../lib/api"

const useStyles = makeStyles(() => ({
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%"
  },
  gridContainer: {
    height: "100%",
    position: "relative"
  },
  card: {
    height: "100%",
    width: "100%",
    marginBottom: "0.5rem",
    transition: "all 0.3s",
    "&:hover": {
      boxShadow:
        "1px 0px 20px -1px rgba(0,0,0,0.2), 0px 0px 20px 5px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
      transform: "translateY(-3px)",
    }
  },
  cardMedia: {
    height: 0,
    paddingTop: "56.25%" // 16:9,
  },
  cardMediaIsClickable: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    cursor: "pointer"
  },
  cardActions: {
    marginTop: "0.5rem"
  }
}))

const AnimeList = ({ loading, animes}) => {
  const [title, setTitle] = useState()
  const [animeDetails, setAnimeDetails] = useState()
  const [open, setOpen] = useState(false)

  const fetchAnimeDetails = async (tid) => {
    setAnimeDetails(await fetchAnimeByTid(tid))
  }
  
  const handleDetailsOpen = async (title, tid) => {
    setTitle(title)
    setOpen(true)
    await fetchAnimeDetails(tid)
  }

  const handleDetalisClose = () => {
    setOpen(false)
  }

  const classes = useStyles()

  return (
    <>
      <Grid container spacing={4}>
        <AnimeDetails
          open={open}
          handleDetalisClose={handleDetalisClose}
          title={title}
          animeDetails={animeDetails}
        />
        {
          loading ? <CircularProgress className={classes.circularProgress} /> :
          animes && animes.length > 1 ? animes.map(anime => (
            <>
              <Grid item key={anime.title} xs={12} sm={6} md={4}>
                <Grid container className={classes.gridContainer}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={anime.syobocal_tid ? classes.cardMediaIsClickable : classes.cardMedia}
                      image={anime.images.recommended_url ? anime.images.recommended_url : "/no_image.png"}
                      onClick={anime.syobocal_tid ? () => handleDetailsOpen(anime.title, anime.syobocal_tid) : null}
                    />
                    <CardActions className={classes.cardActions}>
                      { anime.season_name_text ?
                        <Chip
                          label={anime.season_name_text}
                          variant="outlined"
                        /> : null
                      }
                      { anime.media_text ?
                        <Chip
                          label={anime.media_text}
                          variant="outlined"
                        /> :null
                      }
                      { anime.media_text ?
                        <Chip
                          label="公式サイト"
                          component="a"
                          rel="noopener noreferrer"
                          href={anime.official_site_url}
                          target="_blank"
                          clickable
                          color="secondary"
                          variant="outlined"
                        /> :null
                      }
                      { anime.twitter_hashtag ?
                        <Chip
                          label="Twitter"
                          component="a"
                          rel="noopener noreferrer"
                          href={`https://twitter.com/search?q=${anime.twitter_hashtag}`}
                          target="_blank"
                          clickable
                          color="primary"
                          variant="outlined"
                        /> : null
                      }
                    </CardActions>
                    <CardContent>
                      <Typography variant="h2" gutterBottom>
                        {anime.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </>
          )) : null
        }
      </Grid>
    </>
  )
}

export default AnimeList
