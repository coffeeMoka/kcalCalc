"use client";

import React from "react";
import {
  Container,
  Paper,
  Typography,
  Breadcrumbs
} from "@mui/material";
import styles from "../page.module.css";


const PageTwo = () => {
    return (
        <Container>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">摂取カロリー一覧</Typography>
            </Breadcrumbs>
            <Paper elevation={3} sx={{ p: 5 }}>
            <h1 className={styles.title}>Welcome to Fuyunatsu&apos;s Kcal Manager!</h1>
            <Typography>TOP画面<br/>
                特に何もないよ
            </Typography>
            </Paper>
        </Container>
    );
};

export default PageTwo;