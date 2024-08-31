import { Button } from '@mui/material';

import useRestRequest from '@/shared/hooks/use-rest-request';

export default function RestSubmit() {
  const makeRequest = useRestRequest();

  return (
    <Button variant="contained" onClick={makeRequest}>
      Send
    </Button>
  );
}
