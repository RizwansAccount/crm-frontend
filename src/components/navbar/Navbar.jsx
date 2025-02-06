import React, { useState } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import { Config, removeLocalStorage } from '../../constants/Index';
// import { useNavigate } from 'react-router-dom';
// import { ROUTES } from '../../routes/RouteConstants';

const Navbar = ({ open, handleDrawerOpen, drawerWidth }) => {
    
    // const navigate = useNavigate();
    
    // const [anchorEl, setAnchorEl] = useState(null);
    
    // const fnOpenMenu = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    
    // const fnCloseMenu =()=> {
    //     setAnchorEl(null);
    // };
    
    // const fnLogout = () => {
    //     fnCloseMenu();
    //     removeLocalStorage(Config.userToken);
    //     navigate(ROUTES.login);
    // };
    
    const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    marginLeft: drawerWidth,
                    width: `calc(100% - ${drawerWidth}px)`,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                },
            },
        ],
    }));

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={[
                        { marginRight: 5 },
                        open && { display: 'none' },
                    ]}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar

// import React, { useState } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import { Config, removeLocalStorage } from '../../constants/Index';
// import { useNavigate } from 'react-router-dom';
// import { ROUTES } from '../../routes/RouteConstants';

// const Navbar = () => {
    // const navigate = useNavigate();

    // const [anchorEl, setAnchorEl] = useState(null);

    // const fnOpenMenu = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const fnCloseMenu =()=> {
    //     setAnchorEl(null);
    // };

    // const fnLogout = () => {
    //     fnCloseMenu();
    //     removeLocalStorage(Config.userToken);
    //     navigate(ROUTES.login);
    // };

//     return (
//         <Box sx={{ flexGrow: 1 }}>
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton
//                         size="large"
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                         sx={{ mr: 2 }}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//                         Dashboard
//                     </Typography>
// <div>
//     <IconButton
//         size="large"
//         aria-label="account of current user"
//         aria-controls="menu-appbar"
//         aria-haspopup="true"
//         onClick={fnOpenMenu}
//         color="inherit"
//     >
//         <AccountCircle />
//     </IconButton>
//     <Menu
//         id="menu-appbar"
//         anchorEl={anchorEl}
//         anchorOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//         }}
//         keepMounted
//         transformOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//         }}
//         open={Boolean(anchorEl)}
//         onClose={fnCloseMenu}
//     >
//         <MenuItem onClick={fnLogout}>Logout</MenuItem>
//     </Menu>
// </div>
//                 </Toolbar>
//             </AppBar>
//         </Box>
//     )
// }

// export default Navbar