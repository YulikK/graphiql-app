'use client';

import { useTranslations } from 'next-intl';

import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Loader } from '@/features/loader/loader';
import { useAuth, useHistory } from '@/shared/contexts';
import { useAppDispatch } from '@/shared/hooks/redux-hooks';
import { useLocalStorage } from '@/shared/hooks/use-local-storage';
import { SavedGraphqlRequest, SavedRestRequest } from '@/shared/models/types';
import { restoreGraphState } from '@/shared/store/slices/grahpql-client';
import { restoreRestState } from '@/shared/store/slices/rest-slice';
import {
  isGraphqlRequest,
  isRestRequest,
} from '@/shared/utils/history-requests-typeguard';
import { updateStatuses } from '@/shared/utils/update-statuses';
import EmptyHistory from '@/widgets/empty-history/empty-history';

export default function History({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations('HistoryPage');
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { getStorage, setStorage, removeStorage } = useLocalStorage();
  const { isLoggedIn, loading } = useAuth();

  const { isHistory } = useHistory();

  const [data, setData] = useState<
    (SavedRestRequest | SavedGraphqlRequest)[] | null
  >(null);

  const handleRequest = (el: SavedRestRequest | SavedGraphqlRequest) => {
    if (isRestRequest(el)) {
      const { type, status, browserUrl, ...slice } = el;

      dispatch(restoreRestState(slice));
      isHistory.current = true;

      router.push(browserUrl);
    } else if (isGraphqlRequest(el)) {
      const { type, status, browserUrl, ...slice } = el;

      dispatch(restoreGraphState(slice));
      isHistory.current = true;

      router.push(browserUrl);
    }
  };

  const handleRemoveItem = (id: string) => {
    if (data) {
      const newData = data?.filter(el => el.id !== id);
      setStorage(newData);
      setData(newData);
    }
  };

  const clearHistory = () => {
    removeStorage();

    setData([]);
  };

  useEffect(() => {
    const storedData = getStorage();

    if (storedData) {
      const updatedData = updateStatuses(storedData);

      setData(updatedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push(`/${locale}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, router, loading]);

  if (loading || data === null) {
    return <Loader />;
  }

  return (
    isLoggedIn && (
      <Stack
        display={'flex'}
        flexDirection={'column'}
        marginInline={'auto'}
        maxWidth={800}
        width={'100%'}
        height={'100%'}
        padding={'10px 0'}
      >
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 0,
            gap: '10px',
          }}
        >
          <Typography variant="h3" textAlign={'center'} fontWeight={400}>
            {t('title')}
          </Typography>
          {data.length > 0 && (
            <Button
              variant="contained"
              sx={{ padding: '10px 30px', textAlign: 'center', height: 'auto' }}
              onClick={clearHistory}
            >
              Clear All
            </Button>
          )}
        </Container>
        {data.length > 0 ? (
          <List
            sx={{
              display: 'flex',
              gap: '10px',
              flexDirection: 'column-reverse',
            }}
          >
            {data &&
              data.map(el => (
                <ListItem key={el.id} sx={{ padding: '0' }}>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    onClick={() => handleRequest(el)}
                    sx={{
                      width: '100%',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      padding: '8px 12px',
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          background:
                            Math.floor(el.status / 100) === 2 ? 'green' : 'red',
                        }}
                      >
                        <LinkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Typography
                      variant="h6"
                      marginRight={'10px'}
                      minWidth={'80px'}
                    >
                      {el.type === 'rest'
                        ? `${el.type} ${(el as SavedRestRequest).method}`
                        : el.type}
                    </Typography>
                    <Typography sx={{ wordBreak: 'break-all' }}>
                      {el.url}
                    </Typography>
                  </Box>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveItem(el.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
          </List>
        ) : (
          <EmptyHistory locale={locale} />
        )}
      </Stack>
    )
  );
}
