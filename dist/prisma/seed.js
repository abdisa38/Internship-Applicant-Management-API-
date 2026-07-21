"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const adminEmail = 'admin@infnova.tech';
    const existingAdmin = await prisma.admin.findUnique({
        where: { email: adminEmail },
    });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        await prisma.admin.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
            },
        });
        console.log('Seeded default admin user: admin@infnova.tech / password123');
    }
    else {
        console.log('Default admin already exists.');
    }
    const applicants = [
        {
            firstName: 'Alice',
            lastName: 'Smith',
            email: 'alice.smith@example.com',
            phone: '123-456-7890',
            track: 'Frontend Development',
            status: 'Pending',
        },
        {
            firstName: 'Bob',
            lastName: 'Johnson',
            email: 'bob.johnson@example.com',
            track: 'Backend Development',
            status: 'Shortlisted',
            notes: 'Strong Node.js skills.',
        },
    ];
    for (const app of applicants) {
        const existingApp = await prisma.applicant.findUnique({
            where: { email: app.email },
        });
        if (!existingApp) {
            await prisma.applicant.create({
                data: app,
            });
        }
    }
    console.log('Seeded initial applicants.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map