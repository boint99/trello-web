import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
  trelloCustom: {
    appBarHeight: '48px',
    boardBarHeight: '58px,'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#ff5252'
        }
      },
      spacing: (factor) => `${0.25 * factor}rem`
    },
    dark: {
      palette: {
        primary: {
          main: '#000'
        }
      },
      spacing: (factor) => `${0.25 * factor}rem`
    }
  }
  // ...other properties
})

export default theme