import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: '#f5f5f5',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Box>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold' }}
                    >
                        SadaParcel
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ color: 'gray' }}
                    >
                        Grab and Go
                    </Typography>
                </Link>
            </Box>
            <IconButton
                component={Link}
                to="/cart"
                color="primary"
            >
                <ShoppingCartIcon />
            </IconButton>
        </Box>
    );
}
