import { Box } from '@mui/material';

type TabPanelContainerProps = {
  index: number;
  value: number;
  children: React.ReactNode;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      sx={{
        width: '100%',
        height: '100%',
        padding: 2,
      }}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

export const TabPanelContainer = ({
  value,
  index,
  children,
}: TabPanelContainerProps) => {
  return (
    <CustomTabPanel value={value} index={index}>
      {children}
    </CustomTabPanel>
  );
};
