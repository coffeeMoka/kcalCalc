"use client";

import {
  Box,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Link,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import React from "react";
import { usePathname } from "next/navigation";

type MenuItem = {
    name: string;
    url: string;
    icon: React.ReactNode;
}

const menuList: MenuItem[] = [
    {name: "摂取カロリー登録", url: "/registKCalIntake", icon: <InboxIcon />},
    {name: "摂取カロリー一覧", url: "/KcalIntakeTable", icon: <MailIcon />},
];

const drawerWidth = 240;

const SideBar = () => {
    const pathName = usePathname();
    const isSelected = (url: string) => {
        if (pathName === url || pathName.startsWith(url + "/")) {
            return true;
        }
        return false;
    }
    return (
        <Drawer
            variant="permanent"
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
            },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
            <List>
                {menuList.map(
                ({name, url, icon}: MenuItem) => (
                    <ListItem key={name} disablePadding>
                        <ListItemButton selected={isSelected(url)}>
                        <ListItemIcon>
                            {icon}
                        </ListItemIcon>
                        <Link href={url} underline="none" color="inherit">
                            {name}
                        </Link>
                        </ListItemButton>
                    </ListItem>
                )
                )}
            </List>
            </Box>
        </Drawer>
    );
};

export default SideBar;
