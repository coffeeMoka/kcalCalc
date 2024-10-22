
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/ja";

type ResponseObj = {
    id: number,
    foodName: string,
    takeKcal: number,
    takeDay: string,
    takeTimeType: string,
    createdAt: string
};

const prisma = new PrismaClient();
dayjs.locale("ja");

export async function GET(request: NextRequest): Promise<NextResponse> {
    console.log(`GET /kcalIntake ${request}`);
    const result = await prisma.intakeKcal.findMany({ include: { takeTimeType: true } });
    console.log(result);
    const response: ResponseObj[] = [];
    for (const r of result) {
        const obj: ResponseObj = {
            id: Number(r.id),
            foodName: r.foodName,
            takeKcal: r.takeKcal,
            takeDay: r.takeDay.toLocaleString(),
            takeTimeType: r.takeTimeType.takeType,
            createdAt: r.createdAt.toLocaleString(),
        };
        response.push(obj);
        console.log(obj);
    }
    return NextResponse.json(
        {
            message: `GET /kcalIntake ${response}`
        },
        { status: 200 }
    );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    const requestBody = await request.json();
    console.log(requestBody);
    const takeFoodList: (object | null)[] = [];
    for (const item of requestBody.items) {
        const takeFood = await prisma.intakeKcal.create({
            data: {
                foodName: item.foodName,
                takeKcal: Number(item.takeKcal),
                takeDay: dayjs(item.takeDay).add(9, 'h').toDate(),
                takeTimeTypeId: item.takeTime
            }
        });
        takeFoodList.push(takeFood);
    }
    return NextResponse.json(
        {
            message: `registed takeFoodList:${takeFoodList}`
        },
        { status: 201 }
    );
}