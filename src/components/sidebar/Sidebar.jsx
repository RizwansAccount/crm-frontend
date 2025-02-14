import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Drawer as MuiDrawer, List, CssBaseline, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Leaderboard as LeadIcon,
  Dashboard as DashboardIcon,
  AccountBox as ContactIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import { ROUTES } from '../../routes/RouteConstants';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

const Sidebar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const getRouteForText = (text) => {
        switch (text) {
            case 'Lead':
                return ROUTES.lead;
            case 'Contact':
                return ROUTES.contact;
            case 'Dashboard':
                return ROUTES.home;
            default:
                return '';
        }
    };

    const isItemActive = (text) => {
        const route = getRouteForText(text);
        return location.pathname === route;
    };

    const fnNavigateToPage = (text) => {
        const route = getRouteForText(text);
        navigate(route);
    };

    const menuItems = ['Dashboard', 'Contact', 'Lead'];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <Navbar drawerWidth={drawerWidth} open={open} handleDrawerOpen={handleDrawerOpen} />

            <Drawer variant="permanent" open={open}>
                <div className='flex items-center justify-between py-3 pr-2 pl-4'>
                    <span>Modules</span>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {menuItems.map((text) => {
                        const active = isItemActive(text);
                        return (
                            <ListItem key={text} disablePadding sx={{ display: 'flex', flexDirection:'column', alignItems:'center' }}>
                                <ListItemButton
                                    sx={[
                                        {
                                            minHeight: 48,
                                            px: 2.5,
                                            backgroundColor: active ? "#1976D2" : 'transparent',
                                            '&:hover': {
                                                backgroundColor: active 
                                                    ? "#1976D2" 
                                                    : theme.palette.action.hover,
                                            },
                                            width : "85%",
                                            borderRadius: 1
                                        },
                                        open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                                    ]}
                                    onClick={() => fnNavigateToPage(text)}
                                >
                                    <ListItemIcon
                                        sx={[
                                            { 
                                                minWidth: 0, 
                                                justifyContent: 'center',
                                                color: active ? 'white' : 'inherit',
                                            },
                                            open ? { mr: 3 } : { mr: 'auto' },
                                        ]}
                                    >
                                        {text === 'Dashboard' ? <DashboardIcon /> :
                                            text === "Lead" ? <LeadIcon />
                                                : <ContactIcon style={{height: 27, width:27}} />}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={text}
                                        sx={[
                                            { 
                                                color: active ? "white" : 'inherit',
                                            },
                                            open ? { opacity: 1 } : { opacity: 0 },
                                        ]}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
        </Box>
    );
};

export default Sidebar;
// import React, { useState } from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import ContactIcon from '@mui/icons-material/Contacts';
// import LeadIcon from '@mui/icons-material/Leaderboard';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import Navbar from '../navbar/Navbar';
// import { useNavigate } from 'react-router-dom';
// import { ROUTES } from '../../routes/RouteConstants';

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//     width: drawerWidth,
//     transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//     }),
//     overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//     transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     overflowX: 'hidden',
//     width: `calc(${theme.spacing(7)} + 1px)`,
//     [theme.breakpoints.up('sm')]: {
//         width: `calc(${theme.spacing(8)} + 1px)`,
//     },
// });

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//     ({ theme }) => ({
//         width: drawerWidth,
//         flexShrink: 0,
//         whiteSpace: 'nowrap',
//         boxSizing: 'border-box',
//         variants: [
//             {
//                 props: ({ open }) => open,
//                 style: {
//                     ...openedMixin(theme),
//                     '& .MuiDrawer-paper': openedMixin(theme),
//                 },
//             },
//             {
//                 props: ({ open }) => !open,
//                 style: {
//                     ...closedMixin(theme),
//                     '& .MuiDrawer-paper': closedMixin(theme),
//                 },
//             },
//         ],
//     }),
// );

// const Sidebar = () => {
//     const theme = useTheme();
//     const navigate = useNavigate();
//     const [open, setOpen] = useState(false);

//     const handleDrawerOpen = () => {
//         setOpen(true);
//     };

//     const handleDrawerClose = () => {
//         setOpen(false);
//     };

//     const fnNavigateToPage = (text) => {
//         if (text === 'Lead') {
//             navigate(ROUTES.lead)
//         } else if (text === 'Contact') {
//             navigate(ROUTES.contact)
//         } else if (text === 'Home') {
//             navigate(ROUTES.home)
//         }
//     };

//     return (
//         <Box sx={{ display: 'flex' }}>

//             <CssBaseline />

//             <Navbar drawerWidth={drawerWidth} open={open} handleDrawerOpen={handleDrawerOpen} />

//             <Drawer variant="permanent" open={open}>
//                 <div className='flex items-center justify-between py-3 pr-2 pl-4 '>
//                     <span>Modules</span>
//                     <IconButton onClick={handleDrawerClose}>
//                         {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//                     </IconButton>
//                 </div>
//                 <Divider />
//                 <List>
//                     {['Home', 'Lead', 'Contact']?.map((text, index) => (
//                         <ListItem key={text} disablePadding sx={{ display: 'block' }}>
//                             <ListItemButton
//                                 sx={[
//                                     { minHeight: 48, px: 2.5 },
//                                     open ? { justifyContent: 'initial', } : { justifyContent: 'center' },
//                                 ]}
//                                 onClick={() => fnNavigateToPage(text)}
//                             >
//                                 <ListItemIcon
//                                     sx={[{ minWidth: 0, justifyContent: 'center' }, open ? { mr: 3, } : { mr: 'auto', }]}
//                                 >
//                                     {text === 'Home' ? <DashboardIcon /> :
//                                         text === "Lead" ? <LeadIcon />
//                                             : <ContactIcon />}
//                                 </ListItemIcon>
//                                 <ListItemText
//                                     primary={text}
//                                     sx={[open ? { opacity: 1, } : { opacity: 0, },
//                                     ]}
//                                 />
//                             </ListItemButton>
//                         </ListItem>
//                     ))}
//                 </List>
//             </Drawer>

//         </Box>
//     )
// }

// export default Sidebar