
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest): NextResponse {
    console.log(`GET /kcalIntake ${request}`);
    return NextResponse.json(
        {
            message: `GET /kcalIntake ${request}`
        },
        { status: 200 }
    );
}

export function POST(request: NextRequest): NextResponse {
    console.log(`POST /kcalIntake ${request}`);
    return NextResponse.json(
        {
            message: `POST /kcalIntake ${request}`
        },
        { status: 201 }
    );
}