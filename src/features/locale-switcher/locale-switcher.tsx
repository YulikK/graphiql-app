'use client';

import { useLocale } from 'next-intl';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button, ListItemText, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

import { useTheme } from '@/shared/contexts';

const languages = ['en', 'ru'];

export default function LocaleSwitcher() {
  const locale = useLocale();

  const params = useSearchParams();

  const path = usePathname();

  const router = useRouter();

  const { darkMode } = useTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLocaleChange = (newLocale: string) => {
    router.replace(`${path.replace(locale, newLocale)}?${params.toString()}`);
    handleClose();
  };

  return (
    <>
      <Button
        variant="text"
        onClick={handleClick}
        sx={{
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '50px',
          background: darkMode
            ? 'rgba(0, 0, 0, 0.3)'
            : 'rgba(255, 255, 255, 0.6)',
          padding: '0 20px',
        }}
      >
        {locale}
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {languages.map(lang => (
          <MenuItem key={lang} onClick={() => handleLocaleChange(lang)}>
            <ListItemText
              primary={lang.toUpperCase()}
              sx={{
                padding: '6px',
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
