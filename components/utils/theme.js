import { createMuiTheme } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors"

const theme = createMuiTheme({
  palette: {
    common: {
      white: "#fff",
    },
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    }
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 500,
    }
  }
})

export default theme
