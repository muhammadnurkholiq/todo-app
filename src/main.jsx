import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import theme from './theme';

// third party
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

import 'sweetalert2/src/sweetalert2.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
