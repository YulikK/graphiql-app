'use client';

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

import { useAppDispatch } from '@/shared/hooks/redux-hooks';
import useGraphRequest from '@/shared/hooks/use-graph-request';
import { useLocalStorage } from '@/shared/hooks/use-local-storage';
import useRestRequest from '@/shared/hooks/use-rest-request';
import { SavedGraphqlRequest, SavedRestRequest } from '@/shared/models/types';
import { restoreGraphState } from '@/shared/store/slices/grahpql-client';
import { restoreRestState } from '@/shared/store/slices/rest-slice';

export default function History() {
  const { getStorage } = useLocalStorage();

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
  }, []);

  if (!data) {
    return <div>Loading...</div>;
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
      <Typography variant="h1">History</Typography>
      <List>
        {data &&
          data.map((el, i) => (
            // <HistoryItem
            //   key={i}
            //   url={el.url}
            //   query={el.query || null}
            //   type={el.type}
            // />
            <ListItem
              key={i}
              sx={{
                border: '1px solid black',
              }}
              onClick={() => handleRequest(el)}
              // secondaryAction={
              //   <IconButton edge="end" aria-label="delete">
              //     <DeleteIcon />
              //   </IconButton>
              // }
            >
              <ListItemAvatar>
                <Avatar>
                  <LinkIcon />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="h5" marginRight={'10px'}>
                {el.type}
              </Typography>
              <Typography>{el.url}</Typography>
            </ListItem>
          ))}
      </List>
    </Stack>
  );
}
