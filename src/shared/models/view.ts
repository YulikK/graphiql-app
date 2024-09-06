import { ReactNode } from 'react';

export const TAB_HEAD_SIZE = 50;

export type TabsMap = {
  name: string;
  component: () => ReactNode;
};
