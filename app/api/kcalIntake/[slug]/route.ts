import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/ja";

const prisma = new PrismaClient();
dayjs.locale("ja");

export async function GET(request: NextRequest, { params }: { params: { slug: string } }): Promise<NextResponse> {
    console.log(`GET /kcalIntake ${request}/${params.slug}`);
    const whereDate = dayjs(params.slug).add(9, 'h').toDate();
    const result = await prisma.intakeKcal.findMany({
        where: { takeDay: whereDate },
        include: {
            takeTimeType: true
        }
    });
    console.log(result);
    return NextResponse.json(
        result
    );
}