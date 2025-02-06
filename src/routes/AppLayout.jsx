// import React from 'react';
// import Sidebar from '../components/sidebar/Sidebar';
// import { Outlet } from 'react-router-dom';

// const AppLayout = () => {
//   return (
//     <>
//       <Sidebar/>
//       <Outlet/>
//     </>
//   )
// }

// export default AppLayout
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Sidebar from '../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '64px',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      marginLeft: `calc(${theme.spacing(1)} + 1px)`,
    },
  }),
);

const AppLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </Box>
  );
};

export default AppLayout;