import Box from '@mui/material/Box'
import React from 'react'
import ModeSelect from '../ModeSelect'

function AppBar() {
  return (
    <Box sx={{
      backgroundColor: 'primary.light',
      width: '100%',
      display: 'flex',
      height: (theme) => theme.trelloCustom.appBarHeight,
      alignItems: 'center'
    }}>
      <ModeSelect />
    </Box >
  )
}

export default AppBar
