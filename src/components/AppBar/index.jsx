import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import { Badge, Button, TextField, Tooltip, Typography } from '@mui/material'
import Workspases from './Menus/Workspases'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'

function AppBar() {
  return (
    <Box px={2} sx={{
      backgroundColor: '#fff',
      width: '100%',
      display: 'flex',
      height: (theme) => theme.trelloCustom.boardBarHeight,
      alignItems: 'center',
      justifyContent:'space-between',
      gap: 2,
      overflowX:'auto'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'primary.main' }}/>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            fontSize='small'
            sx={{ color: 'primary.main' }}
          />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>Trello</Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Workspases />
            <Recent />
            <Starred />
            <Templates />
            <Button variant='outlined' startIcon={<LibraryAddIcon />}>Create</Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="search"
          size='small'
          sx={{ minWidth: 120 }}
        />
        <ModeSelect />
        <Tooltip title="Notification">
          <Badge color="secondary" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }}/>
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ color: 'primary.main', cursor: 'pointer' }} />
        </Tooltip>
        <Profiles />
      </Box>

    </Box >
  )
}

export default AppBar
