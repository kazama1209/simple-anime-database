import React, { useState, useEffect } from "react"

import { makeStyles, ThemeProvider } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

import PageTemplate from "../components/layouts/PageTemplate"
import AnimeList from "../components/anime/AnimeList"
import YearSeasonSearch from "../components/anime/YearSeasonSearch"
import theme from "../components/utils/theme"

import { years, seasons, fetchAnimesByYearAndSeason, fetchAnimesByTitle } from "../lib/api"

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: "1.5rem"
  }
}))

function App() {
  const [loading, setLoading] = useState(true)
  const [animes, setAnimes] = useState()

  const fetchAnimesDataByYearAndSeason = async (year, season) => {
    setAnimes(await fetchAnimesByYearAndSeason(year, season))
    setLoading(false)
  }

  const fetchAnimesDataByTitle = async (title) => {
    setAnimes(await fetchAnimesByTitle(title))
    setLoading(false)
  }

  useEffect(() =>{
    fetchAnimesDataByYearAndSeason()
  }, [])

  const classes = useStyles()

  return (
    <>
      <ThemeProvider theme={theme}>
        <PageTemplate
          fetchAnimesDataByTitle={fetchAnimesDataByTitle}
          setLoading={setLoading}
        >
          <Container className={classes.container} maxWidth="lg">
            <YearSeasonSearch
              years={years}
              seasons={seasons}
              fetchAnimesDataByYearAndSeason={fetchAnimesDataByYearAndSeason}
              setLoading={setLoading}
            />
            <AnimeList
              animes={animes}
              loading={loading}
            />
          </Container>
        </PageTemplate>
      </ThemeProvider>
    </>
  )
}

export default App
