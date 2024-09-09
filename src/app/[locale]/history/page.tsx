'use client';

import { useTranslations } from 'next-intl';

import LinkIcon from '@mui/icons-material/Link';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Loader } from '@/features/loader/loader';
import { useAuth } from '@/shared/contexts';
import { useAppDispatch } from '@/shared/hooks/redux-hooks';
import useGraphRequest from '@/shared/hooks/use-graph-request';
import { useLocalStorage } from '@/shared/hooks/use-local-storage';
import useRestRequest from '@/shared/hooks/use-rest-request';
import { SavedGraphqlRequest, SavedRestRequest } from '@/shared/models/types';
import { restoreGraphState } from '@/shared/store/slices/grahpql-client';
import { restoreRestState } from '@/shared/store/slices/rest-slice';

export default function History({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations('HistoryPage');

  const { getStorage } = useLocalStorage();

  const { isLoggedIn, loading } = useAuth();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const makeRestRequest = useRestRequest();

  const makeGraphqlRequest = useGraphRequest();

  const [data, setData] = useState<
    (SavedRestRequest | SavedGraphqlRequest)[] | null
  >(null);

  const handleRequest = (el: SavedRestRequest | SavedGraphqlRequest) => {
    if (el.type === 'rest') {
      const { type, ...slice } = el;

      dispatch(restoreRestState(slice as SavedRestRequest));
      makeRestRequest(true);
    } else {
      const { type, ...slice } = el;

      dispatch(restoreGraphState(slice as SavedGraphqlRequest));
      makeGraphqlRequest(true);
    }
  };

  useEffect(() => {
    const storedData = getStorage();

    if (storedData) {
      setData(storedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(`/${locale}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, router]);

  if (loading || data === null) {
    return <Loader />;
  }

  return (
    <Stack
      display={'flex'}
      flexDirection={'column'}
      marginInline={'auto'}
      maxWidth={800}
      width={'100%'}
      height={'100%'}
      padding={'10px 0'}
    >
      <Typography variant="h2" textAlign={'center'} fontWeight={400}>
        {t('title')}
      </Typography>
      <List sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        {data &&
          data.map((el, i) => (
            <ListItem
              key={i}
              sx={{
                borderRadius: '10px',
                cursor: 'pointer',
              }}
              onClick={() => handleRequest(el)}
            >
              <ListItemAvatar>
                <Avatar>
                  <LinkIcon />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="h6" marginRight={'10px'} minWidth={'80px'}>
                {el.type === 'rest'
                  ? `${el.type} ${(el as SavedRestRequest).method}`
                  : el.type}
              </Typography>
              <Typography sx={{ wordBreak: 'break-all' }}>{el.url}</Typography>
            </ListItem>
          ))}
      </List>
    </Stack>
  );
}
