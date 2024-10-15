import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ListCategory from './CRUDGenre/List';
import AddCategory from './CRUDGenre/AddGenre';
import { useTabContext } from '@/contexts/TabContext';
import TabContext from '@mui/lab/TabContext';

export default function GenreTabs() {
    const { value, setValue } = useTabContext();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "96%", margin: "auto", marginBottom: "20px" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="List Category" value="1" />
              <Tab label="Add Category" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ListCategory />
          </TabPanel>
          <TabPanel value="2">
            <AddCategory />
          </TabPanel>
        </TabContext>
      </Box>
    );
  }
