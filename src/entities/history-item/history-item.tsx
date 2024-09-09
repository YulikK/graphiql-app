import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import { SavedGraphqlRequest, SavedRestRequest } from '@/shared/models/types';

interface HistoryItemProps {
  // type: string;
  // url: string;
  // query: string;
  request: SavedRestRequest | SavedGraphqlRequest;
}

export default function HistoryItem(props: HistoryItemProps) {
  const { request } = props;

  return (
    <>
      <Accordion sx={{ borderRadius: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h5" textAlign={'center'} fontWeight={600}>
            {request.type}
          </Typography>
          <Typography variant="h5" textAlign={'center'} fontWeight={600}>
            {request.url}
          </Typography>
        </AccordionSummary>
        {request.query && (
          <AccordionDetails sx={{ textAlign: 'center' }}>
            <code>
              <pre>{request.query}</pre>
            </code>
          </AccordionDetails>
        )}
        {/* {request.body && (
          <AccordionDetails sx={{ textAlign: 'center' }}>
            <code>
              <pre>{request.body}</pre>
            </code>
          </AccordionDetails>
        )} */}
      </Accordion>
    </>
  );
}
