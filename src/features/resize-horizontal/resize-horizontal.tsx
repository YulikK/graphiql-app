import { Box } from '@mui/material';
import { Allotment } from 'allotment';
import React from 'react';

import { ResizeProvider } from '@/shared/contexts/resize-provider';
import { TAB_HEAD_SIZE } from '@/shared/models/view';

import style from './resize-horizontal.module.css';

type ResizeHorizontalProps = {
  pane1: React.ReactNode;
  pane2: React.ReactNode;
};

const containerBoxStyle = {
  padding: '10px 0',
  width: '100%',
  height: '100%',
  overflow: 'auto',
};

export const ResizeHorizontal = ({ pane1, pane2 }: ResizeHorizontalProps) => {
  return (
    <Box sx={containerBoxStyle}>
      <ResizeProvider>
        <Allotment.Pane
          minSize={TAB_HEAD_SIZE}
          preferredSize={`${TAB_HEAD_SIZE}px`}
          className={style.pane}
        >
          {pane1}
        </Allotment.Pane>

        <Allotment.Pane minSize={100} className={style.pane}>
          <Box sx={containerBoxStyle}>{pane2}</Box>
        </Allotment.Pane>
      </ResizeProvider>
    </Box>
  );
};
