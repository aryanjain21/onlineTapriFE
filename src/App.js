import React, { useMemo, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/login/login';
import SignUp from './pages/signup/signup';
import Header from './components/header/header';

function App() {

  const [mode, setMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode ? 'dark' : 'light',
        }
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route exact path='/' element={<Navigate to='/login' />}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/sign-up' element={<SignUp />}/>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
