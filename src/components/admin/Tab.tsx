import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ListProducts from './CRUD/List';
import AddProducts from './CRUD/AddProduct';

export default function LabTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: "96%", marginLeft: "auto", marginRight: "auto", marginBottom:"20px" }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab style={{ fontSize: "18px", fontFamily: "monospace" }} label="List product" value="1" />
                        <Tab style={{ fontSize: "18px", fontFamily: "monospace" }} label="Add product" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1"><ListProducts /></TabPanel>
                <TabPanel value="2"><AddProducts /></TabPanel>
            </TabContext>
        </Box>
    );
}