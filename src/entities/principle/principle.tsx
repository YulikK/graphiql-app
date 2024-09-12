import Image from 'next/image';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

interface PrincipleProps {
  principle: string;
  description: string;
  icon: string;
}

export default function Principle(props: PrincipleProps) {
  return (
    <>
      <Accordion sx={{ borderRadius: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Image
            src={props.icon}
            alt={`${props.principle}`}
            width={30}
            height={30}
            style={{
              marginRight: '10px',
              filter: 'drop-shadow(2px 3px 3px #3e3d98)',
            }}
          />
          <Typography variant="h5" textAlign={'center'} fontWeight={600}>
            {props.principle}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'center' }}>
          {props.description}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
