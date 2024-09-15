'use client';

import { useTranslations } from 'next-intl';

import Image from 'next/image';

import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';

import graphLogo from '@/assets/graphql.svg';
import restLogo from '@/assets/restFul.svg';
import GraphDescription from '@/entities/graph-description/graph-description';
import RestDescription from '@/entities/rest-description/rest-description';
import { Loader } from '@/features/loader/loader';
import { useHistoryRequest } from '@/shared/hooks/use-history-requests';
import { usePrivateRedirect } from '@/shared/hooks/use-private-redirect';
import { SavedRestRequest } from '@/shared/models/types';
import EmptyHistory from '@/widgets/empty-history/empty-history';

export default function History({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations('HistoryPage');

  const { isLoggedIn, loading } = usePrivateRedirect();

  const { data, handleRequest, handleRemoveItem, clearHistory } =
    useHistoryRequest();

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
              {t('button')}
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
                  <Accordion
                    data-testid="history-item"
                    sx={{
                      width: '100%',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      padding: '8px 12px',
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Image
                        className="history-icon"
                        src={el.type === 'rest' ? restLogo : graphLogo}
                        alt="type logo"
                        width={30}
                        height={30}
                      />
                      <Typography variant="h6" minWidth={'90px'}>
                        {el.type === 'rest'
                          ? `${el.type} ${(el as SavedRestRequest).method}`
                          : el.type}
                      </Typography>
                      <Typography sx={{ wordBreak: 'break-all' }}>
                        {el.url}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          margin: '0 10px',
                          marginLeft: 'auto',
                          padding: '10px 30px',
                          textAlign: 'center',
                          height: 'auto',
                        }}
                        onClick={e => handleRequest(e, el)}
                      >
                        {t('request-button')}
                      </Button>
                    </AccordionSummary>
                    <AccordionDetails>
                      {el.type === 'rest' ? (
                        el.method === 'GET' ? (
                          <RestDescription
                            query={el.query}
                            variables={el.variables}
                          />
                        ) : (
                          <RestDescription
                            query={el.query}
                            variables={el.variables}
                            body={el.body}
                          />
                        )
                      ) : (
                        <GraphDescription
                          query={el.query}
                          variables={el.variables}
                        />
                      )}
                    </AccordionDetails>
                  </Accordion>
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
