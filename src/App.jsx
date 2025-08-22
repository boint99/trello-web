import Button from '@mui/material/Button'
import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import ContrastIcon from '@mui/icons-material/Contrast'
import { Box, Container } from '@mui/material'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    const seletedMode = event.target.value
    setMode(seletedMode)

  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="lable-select-dark-mode">Mode</InputLabel>
      <Select
        labelId="lable-select-dark-mode"
        id="select-dark-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value='light'>
          <Box sx={{ display:'flex', alignContent: 'center', gap: 1 }}>
            <LightModeIcon fontSize='small'/>
          Light
          </Box>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{ display:'flex', alignContent: 'center', gap: 1 }}>
            <DarkModeIcon fontSize='small'/>
          dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box sx={{ display:'flex', alignContent: 'center', gap: 2 }}>
            <ContrastIcon/>
          System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

function App() {

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor:'primary.main' }}>
      <Box sx={{
        backgroundColor: 'primary.light',
        width: '100%',
        display: 'flex',
        height: (theme) => theme.trelloCustom.appBarHeight,
        alignItems: 'center'
      }}>
        <ModeSelect/>
      </Box >
      <Box sx={{
        backgroundColor: 'primary.dark',
        width: '100%',
        display: 'flex',
        height: (theme) => theme.trelloCustom.boardBarHeight,
        alignItems: 'center'
      }}>
        Board Bar
      </Box>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.trelloCustom.appBarHeight} - ${theme.trelloCustom.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center'
      }}>
        Board content
      </Box>
    </Container>
  )

}

export default App
