import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import ContrastIcon from '@mui/icons-material/Contrast'
import Box from '@mui/material/Box'


function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    const seletedMode = event.target.value
    setMode(seletedMode)

  }

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
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
          <Box sx={{ display:'flex', alignContent: 'center', gap: 1 }}>
            <ContrastIcon/>
          System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
