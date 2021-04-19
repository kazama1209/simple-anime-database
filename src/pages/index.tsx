import React, { useState, useEffect } from "react"

import { makeStyles, ThemeProvider } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

import PageTemplate from "../components/layouts/PageTemplate"
import AnimeList from "../components/anime/AnimeList"
import YearSeasonSearch from "../components/anime/YearSeasonSearch"
import theme from "../components/utils/theme"

import { fetchAnimesByYearAndSeason, fetchAnimesByTitle } from "../lib/api"

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: "1.5rem"
  }
}))

const currentYear: number = new Date().getFullYear()

const years: Year[] = []
for (var y = currentYear; y >= 1963; y--) {
  years.push({
    value: y,
    label: `${y}`
  })
}

const seasons: Season[] = [
  { value: "winter", label: "冬" },
  { value: "spring", label: "春" },
  { value: "summer", label: "夏" },
  { value: "autumn", label: "秋" }
]

const currentSeason: string = seasons[(Math.ceil((new Date().getMonth() +1 ) / 3)) - 1].value

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [animes, setAnimes] = useState<Anime[]>()

  const fetchAnimesDataByYearAndSeason = async (year: number, season: string) => {
    setAnimes(await fetchAnimesByYearAndSeason(year, season))
    setLoading(false)
  }

  const fetchAnimesDataByTitle = async (title: string) => {
    setAnimes(await fetchAnimesByTitle(title))
    setLoading(false)
  }

  useEffect(() =>{
    fetchAnimesDataByYearAndSeason(currentYear, currentSeason)
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
