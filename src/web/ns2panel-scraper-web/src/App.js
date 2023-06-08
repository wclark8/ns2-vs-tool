import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MainPage from './views/MainPage';
import ScraperApi from './api/scraperApi';

const mdTheme = createTheme();

function App() {
  const apiConfig = {url: 'http://localhost:3000', headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },};

  const scraperApi = new ScraperApi(apiConfig.url, apiConfig.headers);
  
  return (
    <ThemeProvider theme={mdTheme}>
    <div className="App">
      <Box sx={{display: 'flex'}}>
      <AppBar position="sticky">
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NS2 VS Tool
          </Typography>
          </Toolbar>
      </AppBar>
      </Box>
      <Box component="main"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[100]
                      : theme.palette.grey[900],
                  flexGrow: 1,
                  height: '100vh',
                  overflow: 'auto',
                  paddingTop: 6
                }}>
        <MainPage scraperApi={scraperApi}></MainPage>
      </Box>
    </div>
    </ThemeProvider>
  );
}
export default App;
