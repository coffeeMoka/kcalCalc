"use client";

import {
  AppBar,
  Toolbar,
  Link
} from "@mui/material";

import React from "react";

const NavigationBar = () => {
    return (
        <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
        <Toolbar>
            <Link href="/" underline="none" color="inherit">
                摂取カロリー記録表
            </Link>
        </Toolbar>
        </AppBar>);
};

export default NavigationBar;