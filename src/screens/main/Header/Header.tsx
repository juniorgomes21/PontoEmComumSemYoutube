import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header() {

    return (
        <Box sx={{  flexGrow: 1  }}>
            <AppBar position="static" sx={{ background: '#fff' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ display: 'flex', flexGrow: 1, width: '100%', justifyContent: 'center', color: 'black' }}>
                        Ponto em Comum
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;