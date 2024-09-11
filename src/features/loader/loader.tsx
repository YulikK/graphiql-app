import { Box, CircularProgress } from '@mui/material';

export const Loader = () => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100%'}
    >
      <CircularProgress />
    </Box>
  );
};
