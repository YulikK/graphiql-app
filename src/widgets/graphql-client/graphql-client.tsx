'use client';
import '@/shared/styles/resize-custom.css';

import { Box, Card, debounce } from '@mui/material';
import { Allotment, AllotmentHandle } from 'allotment';
import 'allotment/dist/style.css';
import clsx from 'clsx';
import { useMemo, useRef, useState } from 'react';

import { GraphQuery } from '@/features/client-query/client-query';
import { SettingsTab } from '@/widgets/settings-tab/settings-tab';

import style from './graphql-client.module.css';

const TAB_HEAD_SIZE = 50;

type GraphqlClientProps = {
  children: React.ReactNode;
};
export default function GraphqlClient({ children }: GraphqlClientProps) {
  const [isSettingsHide, setIsSettingsHide] = useState(true);
  const refAllotment = useRef<AllotmentHandle>(null);

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

  const handleSettingsResize = useMemo(
    () =>
      debounce((sizes) => {
        setIsSettingsHide(sizes[0] === TAB_HEAD_SIZE);
      }, 100),
    []
  );

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
                  <GraphQuery />
                </Allotment.Pane>
                <Allotment.Pane snap preferredSize="50%" className={style.wrap}>
                  {children}
                </Allotment.Pane>
              </Allotment>
            </Card>
          </Box>
        </Allotment.Pane>
      </Allotment>
    </Box>
  );
}
