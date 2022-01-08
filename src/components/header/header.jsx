import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useMatch } from 'react-router-dom';
import { useUser } from '../../context/userContext';

const settings = ['Logout'];

const Header = () => {

  let navigate = useNavigate();
  let match = useMatch('/login');
  const { user, userDispatch } = useUser();
  const [date] = useState(new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(Date.now()));
  const [time] = useState(new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(Date.now()));
  const [setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenu = (option) => {
    if (option === 'Logout') {
      localStorage.clear('setUser');
      userDispatch({ type: 'LOGOUT' });
    }
    if(match) {
      navigate('/sign-up');
    } else {
      navigate('/login');
    }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Online Tapri
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Online Tapri
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, marginLeft: "auto", marginRight: "48px", textAlign: "right" }}>
            {time} - {date}
          </Box>
          {!(user.token) ? <Box sx={{ flexGrow: 0, cursor: "pointer", marginLeft: { xs: "auto", sm: "0" } }} onClick={() => handleMenu('Login')}>
            <Typography textAlign="center">{match ? 'Sign Up' : 'Login'}</Typography>
          </Box>
            :
            <Box sx={{ flexGrow: 0, marginLeft: { xs: "auto", sm: "0" } }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.firstName} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" onClick={() => handleMenu(setting)}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
