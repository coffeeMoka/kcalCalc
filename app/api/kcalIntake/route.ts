import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getDailyIntakeKcal } from "@prisma/client/sql"
import dayjs from "dayjs";
import "dayjs/locale/ja";

const prisma = new PrismaClient();
dayjs.locale("ja");

export async function GET(request: NextRequest): Promise<NextResponse> {
    console.log(`GET /kcalIntake ${request}`);
    const result = await prisma.$queryRawTyped(getDailyIntakeKcal());
    console.log(result);
    return NextResponse.json(
        result
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