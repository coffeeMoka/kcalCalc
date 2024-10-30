"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Breadcrumbs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import styles from "../page.module.css";

dayjs.locale("ja");

type takeKcal = {
    time: string,
    dailyTakeKcal: number
};

type viewTakeKcal = {
    date: string,
    takeKcal: number,
    takeResult: string
};

const limitKcal: number = 1800;

const PageTwo = () => {
    const [rows, setRows] = useState<viewTakeKcal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getData() {
            if(!loading) {
                return;
            }
            const response = await fetch("/api/kcalIntake");
            const takeKcalList: takeKcal[] = await response.json();
            const result: viewTakeKcal[] = [];
            for (const takeKcal of takeKcalList) {
                const viewTake: viewTakeKcal = {
                    date: takeKcal.time,
                    takeKcal: Number(takeKcal.dailyTakeKcal),
                    takeResult: Number(takeKcal.dailyTakeKcal) <= limitKcal ? "OK" : "NG"
                }
                result.push(viewTake);
            }
            setRows(result);
            setLoading(false);
        }
        getData();
    })
    
    return (
        <Container>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="primary">摂取カロリー一覧</Typography>
            </Breadcrumbs>
            <Paper elevation={3} sx={{ p: 5 }}>
                <h1 className={styles.title}>摂取カロリー一覧</h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">日付</TableCell>
                                <TableCell align="center">摂取カロリー</TableCell>
                                <TableCell align="center">判定結果</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.date}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell align="right">{row.takeKcal}</TableCell>
                                <TableCell style={row.takeResult == "OK" ? {color: "cyan"} : {color: "magenta"}}>{row.takeResult}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default PageTwo;