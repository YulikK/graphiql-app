import { Box } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        backgroundColor: '#f8f8f8',
      }}
    ></Box>
  );
}
