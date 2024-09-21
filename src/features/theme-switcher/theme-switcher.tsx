import Image from 'next/image';

import { Box, FormControlLabel, Switch } from '@mui/material';

import dark from '@/assets/night.png';
import light from '@/assets/sun.png';
import { useTheme } from '@/shared/contexts';

export const ThemeSwitcher = () => {
  const { toggleTheme, darkMode } = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={darkMode}
            onChange={toggleTheme}
            color="default"
            inputProps={{ 'aria-label': 'theme switcher' }}
            sx={{
              width: 70,
              height: 40,
              padding: 0,
              filter: 'drop-shadow(2px 3px 2px #00000050)',
              '& .MuiSwitch-track': {
                borderRadius: 40 / 2,
                backgroundColor: '#d5dff9',
                opacity: 1,
                height: '100%',
                width: '100%',
              },
              '& .MuiSwitch-thumb': {
                width: 32,
                height: 32,
                backgroundColor: darkMode ? '#f0f0f0' : '#7193eb',
                position: 'absolute',
              },
              '& .MuiSwitch-switchBase': {
                padding: 0,
                height: 32,
                width: 32,
                top: 4,
                left: 4,
              },
              '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(29px)',
              },
            }}
          />
        }
        label=""
        sx={{
          marginLeft: 1,
        }}
      />
      <Image
        src={darkMode ? dark : light}
        alt="Image alt"
        priority
        width={30}
        height={25}
        style={{
          objectFit: 'contain',
          position: 'absolute',
          zIndex: '1',
          top: '8px',
          left: darkMode ? '42px' : '13px',
          cursor: 'pointer',
        }}
        onClick={toggleTheme}
      />
    </Box>
  );
};
