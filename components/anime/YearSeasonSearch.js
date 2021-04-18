import React, { useState } from "react"
import Select from "react-select"

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
    minWidth: 150
  }
}))

const YearSeasonSearch = ({ years, seasons, fetchAnimesDataByYearAndSeason, setLoading }) => {
  const [year, setYear] = useState()
  const [season, setSeason] = useState()

  const classes = useStyles()

  return (
    <Grid className={classes.gridContainer} container justify="center">
      <FormControl className={classes.formControl}>
        <Select
          instanceId="year-select"
          placeholder="年"
          options={years}
          onChange={(e) => {
            setYear(e.value)
          }}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Select
          instanceId="season-select"
          placeholder="シーズン"
          options={seasons}
          onChange={(e) => {
            setSeason(e.value)
          }}
        />  
      </FormControl>        
      <IconButton
        type="submit"
        className={classes.iconButton}
        variant="contained"
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
