import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {Tabs, Tab, AppBar, Box} from '@mui/material';
import { CreateCard } from './CreateCard';
import { CreateGenre } from './CreateGenre';
import classesCreate from '../../styles/classesCreate';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export function CreateCardGenre() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const cardTabs = {
    background: '#ae5e0b',
    color: '#ffffff'
  }
 

  return (
    <Box sx={classesCreate.cardAppBar}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          style={cardTabs}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Створити книгу" {...a11yProps(0)} />
          <Tab label="Створити жанр" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      
        <TabPanel value={value} index={0} dir={theme.direction}>
          <CreateCard/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <CreateGenre/>
        </TabPanel>
    </Box>
  );
}