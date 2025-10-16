import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminExists = await prisma.user.findUnique({
    where: { email: "admin@snacklirio.com" },
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.user.create({
      data: {
        name: "Administrador",
        email: "admin@snacklirio.com",
        password: hashedPassword,
        type: "admin",
      },
    });
    console.log("✅ Usuário admin criado com sucesso!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 Email: admin@snacklirio.com");
    console.log("🔑 Senha: admin123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  } else {
    console.log("⚠️  Usuário admin já existe.");
  }
}

main()
  .catch((e) => {
    console.error("❌ Erro:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
