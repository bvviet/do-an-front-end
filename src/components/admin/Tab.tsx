import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import AddProducts from './CRUD/AddProduct';
import { useTabContext } from '@/contexts/TabContext';
import ListProducts from './CRUD/List';

export default function LabTabs() {
    const { value, setValue } = useTabContext();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider", width: "96%", margin: "auto", marginBottom: "20px" }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Danh Sách Sản Phẩm" value="1" />
                        <Tab label="Thêm Mới Sản Phẩm" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <ListProducts />
                </TabPanel>
                <TabPanel value="2">
                    <AddProducts />
                </TabPanel>
            </TabContext>
        </Box>
    );
}
