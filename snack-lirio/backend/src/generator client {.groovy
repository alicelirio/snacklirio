generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

enum Role {
  ADMIN
  SUPPLIER
  CLIENT
}

enum OrderStatus {
  PENDING
  PAID
  DELIVERED
}

model User {
  id        String    @id @default(uuid())
  name      String
  email     String    @unique
  password  String
  role      Role      @default(CLIENT)
  products  Product[] @relation("UserProducts")
  orders    Order[]   @relation("UserOrders")
  createdAt DateTime  @default(now())
}

model Product {
  id          String      @id @default(uuid())
  name        String
  description String
  price       Float
  image       String?
  supplier    User        @relation("UserProducts", fields: [supplierId], references: [id])
  supplierId  String
  orderItems  OrderItem[]
  createdAt   DateTime    @default(now())
}

model Order {
  id        String      @id @default(uuid())
  client    User        @relation("UserOrders", fields: [clientId], references: [id])
  clientId  String
  status    OrderStatus @default(PENDING)
  items     OrderItem[]
  total     Float       @default(0)
  createdAt DateTime    @default(now())
}

model OrderItem {
  id        String   @id @default(uuid())
  order     Order    @relation(fields: [orderId], references: [id])
  orderId   String
  product   Product  @relation(fields: [productId], references: [id])
  productId String
  quantity  Int
  price     Float
}
