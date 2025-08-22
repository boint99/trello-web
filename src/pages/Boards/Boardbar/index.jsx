import Box from '@mui/material/Box'

function BoardBar() {
  return (
    <Box sx={{
      backgroundColor: 'primary.dark',
      width: '100%',
      display: 'flex',
      height: (theme) => theme.trelloCustom.boardBarHeight,
      alignItems: 'center'
    }}>
      Board Bar
    </Box>
  )
}

export default BoardBar
