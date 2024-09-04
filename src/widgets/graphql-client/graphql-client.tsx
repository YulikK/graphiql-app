'use client';
import '@/shared/styles/resize-custom.css';
import { useTranslations } from 'next-intl';

import { Box, Card, debounce } from '@mui/material';
import { Allotment, AllotmentHandle } from 'allotment';
import 'allotment/dist/style.css';
import clsx from 'clsx';
import {
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLSchema,
} from 'graphql';
import { useEffect, useMemo, useRef, useState } from 'react';

import { CodeEditor } from '@/features/code-editor/code-editor';
import { HttpMethod } from '@/shared/models/http-methods';
import { SettingsTab } from '@/widgets/settings-tab/settings-tab';

import style from './graphql-client.module.css';

const TAB_HEAD_SIZE = 50;

const fetchSchema = async (url: string) => {
  const response = await fetch(url, {
    method: HttpMethod.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getIntrospectionQuery(),
    }),
  });
  const result = await response.json();
  const schema = buildClientSchema(result.data);
  return schema;
};

type GraphqlClientProps = {
  children: React.ReactNode;
};
export default function GraphqlClient({ children }: GraphqlClientProps) {
  const [graphqlQuery, setGraphqlQuery] = useState('');
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [isSettingsHide, setIsSettingsHide] = useState(true);
  const refAllotment = useRef<AllotmentHandle>(null);
  const [url, setUrl] = useState(
    'https://swapi-graphql.netlify.app/.netlify/functions/index'
  );
  // const [headers, setHeaders] = useState<Header[]>([{ key: '', value: '' }]);

  const t = useTranslations('GraphqlPage');
  useEffect(() => {
    fetchSchema(`${url}?sdl`).then((newSchema) => {
      if (newSchema) {
        setSchema(newSchema);
      }
    });
  }, [url]);

  const onMaximize = () => {
    setIsSettingsHide(false);
    if (refAllotment.current) {
      refAllotment.current.resize([300, 500]);
    }
  };
  const onMinimize = () => {
    setIsSettingsHide(true);
    if (refAllotment.current) {
      refAllotment.current.reset();
    }
  };

  const handleGraphqlChange = (value: string) => {
    setGraphqlQuery(value);
  };

  const handleSettingsResize = useMemo(
    () =>
      debounce((sizes) => {
        setIsSettingsHide(sizes[0] === TAB_HEAD_SIZE);
      }, 100),
    []
  );

  // const handleSendRequest = async () => {
  //   const headersObject = Object.fromEntries(
  //     headers
  //       .filter((header) => header.key && header.value)
  //       .map((header) => [header.key, header.value])
  //   );

  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       ...headersObject,
  //     },
  //     body: JSON.stringify({
  //       query: graphqlQuery,
  //       variables: JSON.parse(variables),
  //     }),
  //   });
  //   const result = await response.json();
  //   setResponse(JSON.stringify(result, null, 2));
  // };

  return (
    <Box className={style.container}>
      <Allotment
        className={style.splitViewContainer}
        ref={refAllotment}
        vertical
        onChange={handleSettingsResize}
      >
        <Allotment.Pane
          minSize={TAB_HEAD_SIZE}
          preferredSize={`${TAB_HEAD_SIZE}px`}
          className={style.pane}
        >
          <SettingsTab
            isSettingsHide={isSettingsHide}
            onMaximize={onMaximize}
            onMinimize={onMinimize}
          />
        </Allotment.Pane>
        <Allotment.Pane minSize={100} className={style.pane}>
          <Box className={style['editors-container']}>
            <Card className={clsx(style['editors-card'], 'item')}>
              <Allotment snap>
                <Allotment.Pane snap preferredSize="50%" className={style.wrap}>
                  <CodeEditor
                    isGraphQl={true}
                    schema={schema}
                    value={graphqlQuery}
                    onChange={handleGraphqlChange}
                    // onSubmit={handleSendRequest}
                  />
                </Allotment.Pane>
                <Allotment.Pane snap preferredSize="50%" className={style.wrap}>
                  {children}
                  {/* <CodeEditor value={response} isEdit={false} /> */}
                </Allotment.Pane>
              </Allotment>
            </Card>
          </Box>
        </Allotment.Pane>
      </Allotment>
    </Box>
  );
}
