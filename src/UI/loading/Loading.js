import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import styled from '@emotion/styled';
const MyLoading = styled(LinearProgress)({
    background: 'linear-gradient(90deg, #fee16b 30%, #d6982e 30%, #ae5e0b 90%)',
    border: 0,
    borderRadius: '20px',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    
  });

export function Loading({children}) {


    
    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <MyLoading>
                {children}
            </MyLoading> 
        </Stack>
    );
}