import { createMuiTheme } from '@material-ui/core/styles'
import deepOrange from '@material-ui/core/colors/deepOrange'

// #C2F83A
// #37D1DE
// #355A47
// #B5E5E7
// #675D4F


// #12BCE5
// #C3DE1C
// #8CCED9 // pale blue
// #ABA769
// #12333B
// #A22F16 // red

export default createMuiTheme({
  palette: {
    primary: { main: '#076499' },
    secondary: { main: '#A22F16' }
  },

  overrides: {
    MuiButton: {
      containedSecondary: {
        '&:hover': {
          backgroundColor: '#d2401e',
        }
      },
    },
  }
})
