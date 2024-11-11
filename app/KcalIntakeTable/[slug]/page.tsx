"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
import styles from "../../page.module.css";

dayjs.locale("ja");

type takeTimeType = {
    id: number,
    takeType: string
};

type intakeKcal = {
    id: number,
    foodName: string,
    takeKcal: number,
    takeDay: Date,
    takeTimeTypeId: number,
    takeTimeType: takeTimeType
};

type viewIntakeKcal = {
    id: number,
    foodName: string,
    kcal: number,
    takeDay: Date,
    takeTimeTypeId: number,
    takeTimeType: string
};

const PageTwo = () => {
    const [rows, setRows] = useState<viewIntakeKcal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const params = useParams();

    useEffect(() => {
        
        async function getData() {
            if(!loading) {
                return;
            }
            const response = await fetch(`/api/kcalIntake/${encodeURIComponent(params.slug.toString())}`);
            const takeKcalList: intakeKcal[] = await response.json();
            const result: viewIntakeKcal[] = [];
            for (const takeKcal of takeKcalList) {
                const viewTake: viewIntakeKcal = {
                    id: takeKcal.id,
                    foodName: takeKcal.foodName,
                    kcal: takeKcal.takeKcal,
                    takeDay: takeKcal.takeDay,
                    takeTimeTypeId: takeKcal.takeTimeTypeId,
                    takeTimeType: takeKcal.takeTimeType.takeType
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
                    <Table sx={{ minWidth: 650 }} aria-label="takeKcal table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">日付</TableCell>
                                <TableCell align="center">食品名</TableCell>
                                <TableCell align="center">摂取カロリー</TableCell>
                                <TableCell align="center">食事したタイミング</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{dayjs(row.takeDay).format("YYYY/MM/DD")}</TableCell>
                                    <TableCell align="left">{row.foodName}</TableCell>
                                    <TableCell align="right">{row.kcal}</TableCell>
                                    <TableCell align="right">{row.takeTimeType}</TableCell>
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