import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import { Badge, Button, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import Workspases from './Menus/Workspases'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'

function AppBar() {
  const [searchValue, setSearValue] = useState('')
  return (
    <Box px={2} sx={{
      width: '100%',
      display: 'flex',
      height: (theme) => theme.trelloCustom.boardBarHeight,
      alignItems: 'center',
      justifyContent:'space-between',
      gap: 2,
      overflowX:'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')

    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'white' }}/>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            fontSize='small'
            sx={{ color: 'white' }}
          />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>Trello</Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Workspases />
            <Recent />
            <Starred />
            <Templates />
            <Button
              sx={{
                color: 'white',
                border: 'none',
                '&:hover': { border: 'none' }
              }}
              variant='outlined'
              startIcon={<LibraryAddIcon />}
            >Create
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="text"
          size='small'
          value={searchValue}
          onChange={(e) => setSearValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: 'white' }}/>
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                sx={{ color: searchValue? 'white' : 'transparent', cursor: 'pointer' }}
                fontSize='small'
                onClick = { () => setSearValue('')}
              />
            )
          }}
          sx={{
            minWidth: '120px',
            maxWidth: '180px',
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& lable.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white'
              },
              '&:hover fieldset': {
                borderColor: 'white'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white'
              }
            }

          }}
        />
        <ModeSelect />
        <Tooltip title="Notification">
          <Badge color="warning" variant='dot' sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'white' }}/>
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ color: 'white', cursor: 'pointer' }} />
        </Tooltip>
        <Profiles />
      </Box>

    </Box >
  )
}

export default AppBar
