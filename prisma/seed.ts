import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const createTakeTimeTypeMany = await prisma.takeTimeType.createMany({
        data: [
            { takeType: "朝" },
            { takeType: "昼" },
            { takeType: "夜" },
            { takeType: "その他" },
        ]
    });
    console.log(createTakeTimeTypeMany);
}

main().finally(async () => {
    await prisma.$disconnect();
});