"use client";

import styles from "./page.module.css";
import {
  Container,
  Paper,
  Typography
} from "@mui/material";

export default function Home() {
  return (
    <Container>
      <Paper elevation={3} sx={{ p: 5 }}>
        <h1 className={styles.title}>Welcome to Fuyunatsu&apos;s Kcal Manager!</h1>
        <Typography>TOP画面<br/>
          特に何もないよ
        </Typography>
      </Paper>
    </Container>
  );
}