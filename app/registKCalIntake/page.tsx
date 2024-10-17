"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from 'zod';
import { 
    Box, 
    Button, 
    Stack, 
    TextField, 
    Typography, 
    Container, 
    Paper,
    Breadcrumbs,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import styles from "../page.module.css";

const schema = z.object({
    items: z.array(
        z.object({foodName: z.string(), 
            kCal: z.string().transform((val => Number(val))), 
            registedDay: z.string(), 
            registedTime: z.string()
        })
    )
});

dayjs.locale("ja");

type FormData = z.infer<typeof schema>;
const initDate = dayjs().format("YYYY-MM-DD");
const initVal = { foodName: "", kCal: 0, registedDay: initDate, registedTime: "朝" };

const PageOne = () => {
    const { handleSubmit, control } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            items: [initVal]
        }
    })

    const { fields, append, remove } = useFieldArray({
         control,
         name: 'items'
    });

    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const onSubmit = (data: FormData) => {
        setIsSubmitted(true);
        console.log(data.items);
    }

    return (
         <Container>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">摂取カロリー登録</Typography>
            </Breadcrumbs>
            <Paper elevation={3} sx={{ p: 5 }}>
                <h1 className={styles.title}>摂取カロリー登録</h1>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    {fields.map((field, index) => {
                        const isFirstField = index === 0;
                        return (
                            <Stack key={field.id} direction={"row"} spacing={1} my={1}>
                                <Controller
                                    name={`items.${index}.foodName`}
                                    control={control}
                                    render={({field}) => (
                                        <TextField {...field} placeholder={"食べたもの"} />
                                    )}
                                />
                                <Controller
                                    name={`items.${index}.kCal`}
                                    control={control}
                                    render={({field}) => (
                                        <TextField type="number" {...field} placeholder={"摂取カロリー"} />
                                    )}
                                />
                                <Controller
                                    name={`items.${index}.registedDay`}
                                    control={control}
                                    render={({field}) => (
                                        <TextField type="date" {...field} placeholder={"食べた日時"} />
                                    )}
                                />
                                <Controller
                                name={`items.${index}.registedTime`}
                                    control={control}
                                    render={({field}) => (
                                        <TextField {...field} placeholder={"食べた時間帯"} />
                                    )}
                                />
                                <Button variant="outlined" onClick={() => isFirstField ? append(initVal) : remove(index) }>
                                    {isFirstField ? "行追加" : "行削除"}
                                </Button>
                            </Stack>
                        )
                    })}
                    <Stack spacing={1}>
                        <Button variant="contained" type="submit">
                            送信
                        </Button>           
                    </Stack>
                    <Typography>{isSubmitted ? '送信しました' : ''}</Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default PageOne;