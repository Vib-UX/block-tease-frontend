import * as React from 'react';
import LinearProgress, {
  linearProgressClasses,
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <BorderLinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography className='text-zinc-400'>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel({
  progress,
}: {
  progress: number;
}) {
  const [loader, setLoader] = React.useState(0);
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (progress === 10) {
      interval = setInterval(() => {
        setLoader((prevProgress) =>
          prevProgress === 90 ? 90 : prevProgress + 2
        );
      }, 800);
    } else {
      setLoader(100);
    }

    return () => {
      clearInterval(interval);
    };
  }, [progress, setLoader]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={loader} />
    </Box>
  );
}
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 7,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#1f0f22',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: '#fb0393',
  },
}));
