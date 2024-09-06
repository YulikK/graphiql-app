import { TabPanel } from '@mui/lab';

import style from './tab-panel-conrainer.module.css';

type TabPanelContainerProps = {
  name: string;
  children: React.ReactNode;
};
export const TabPanelContainer = ({
  name,
  children,
}: TabPanelContainerProps) => {
  return (
    <TabPanel value={name} className={style['tab-panel']}>
      {children}
    </TabPanel>
  );
};
