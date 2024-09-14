'use client';

import { debounce } from '@mui/material';
import { Allotment, AllotmentHandle } from 'allotment';
import React, { createContext, useMemo, useRef, useState } from 'react';

import { TAB_HEAD_SIZE } from '../models/view';

export interface ResizeContextProps {
  onMaximize: () => void;
  onMinimize: () => void;
  isPaneHide: boolean;
}

export const ResizeContext = createContext<ResizeContextProps | undefined>(
  undefined
);

export const ResizeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPaneHide, setIsPaneHide] = useState(true);

  const refAllotment = useRef<AllotmentHandle>(null);

  const onMaximize = () => {
    setIsPaneHide(false);

    if (refAllotment.current) {
      refAllotment.current.resize([300, 500]);
    }
  };

  const onMinimize = () => {
    setIsPaneHide(true);

    if (refAllotment.current) {
      refAllotment.current.reset();
    }
  };

  const handleSettingsResize = useMemo(
    () =>
      debounce(sizes => {
        setIsPaneHide(sizes[0] === TAB_HEAD_SIZE);
      }, 100),
    []
  );

  return (
    <ResizeContext.Provider value={{ onMaximize, onMinimize, isPaneHide }}>
      <Allotment
        ref={refAllotment}
        vertical
        onChange={handleSettingsResize}
        className="splitViewContainer"
      >
        {children}
      </Allotment>
    </ResizeContext.Provider>
  );
};
