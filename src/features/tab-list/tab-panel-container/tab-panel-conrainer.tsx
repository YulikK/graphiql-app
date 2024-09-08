import { TabPanel } from '@mui/lab';

type TabPanelContainerProps = {
  name: string;
  children: React.ReactNode;
};
export const TabPanelContainer = ({
  name,
  children,
}: TabPanelContainerProps) => {
  return (
    <TabPanel
      value={name}
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </TabPanel>
  );
};
