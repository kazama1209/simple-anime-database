import React, { useState } from "react"
import Select, { OptionTypeBase } from "react-select"

import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import FormControl from "@material-ui/core/FormControl"

const useStyles = makeStyles(() => ({
  gridContainer: {
    marginBottom: "2rem"
  },
  iconButton: {
    padding: 10
  },
  formControl: {
    margin: "3px",
    minWidth: 130
  }
}))

interface YearSeasonSearchProps {
  years: Year[]
  seasons: Season[]
  fetchAnimesDataByYearAndSeason: Function
  setLoading: Function
}

const YearSeasonSearch: React.FC<YearSeasonSearchProps> = ({ years, seasons, fetchAnimesDataByYearAndSeason, setLoading }) => {
  const [year, setYear] = useState("")
  const [season, setSeason] = useState("")

  const classes = useStyles()

  return (
    <Grid className={classes.gridContainer} container justify="center">
      <FormControl className={classes.formControl}>
        <Select
          instanceId="year-select"
          placeholder="年"
          options={years}
          onChange={(e: OptionTypeBase) => {
            setYear(e.value)
          }}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Select
          instanceId="season-select"
          placeholder="シーズン"
          options={seasons}
          onChange={(e: OptionTypeBase) => {
            setSeason(e.value)
          }}
        />  
      </FormControl>
      <IconButton
        type="submit"
        className={classes.iconButton}
        size="medium"
        color="default"
        disabled={!year || !season}
        onClick={() => {
          setLoading(true)
          fetchAnimesDataByYearAndSeason(year, season)
        }}
      >
        <SearchIcon />
      </IconButton>
    </Grid>
  )
}

export default YearSeasonSearch
