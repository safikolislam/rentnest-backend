import bcrypt from "bcryptjs";
import {prisma} from "../src/lib/prisma"

async function main() {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.upsert({
        where: { email: "admin@rentnest.com" },
        update: {},
        create: {
            name: "Admin",
            email: "shakilkhandoker",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log(" Admin created:", admin.email);

    const categories = ["Apartment", "House", "Studio", "Room"];

    for (const name of categories) {
        await prisma.category.upsert({
            where: { name },
            update: {},
            create: { name },
        });
    }

    console.log(" Categories created:", categories.join(", "));
}

main()
    .catch((error) => {
        console.error(" Seeding failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });