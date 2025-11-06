# Code Citations

## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem {
  i
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem {
  id        String   
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem {
  id        String   @id @default
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem {
  id        String   @id @default(uuid())
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem {
  id        String   @id @default(uuid())
  order
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem {
  id        String   @id @default(uuid())
  order     Order    @
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem {
  id        String   @id @default(uuid())
  order     Order    @relation(fields:
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem {
  id        String   @id @default(uuid())
  order     Order    @relation(fields: [orderId],
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem {
  id        String   @id @default(uuid())
  order     Order    @relation(fields: [orderId], references: [i
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem {
  id        String   @id @default(uuid())
  order     Order    @relation(fields: [orderId], references: [id])
  or
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem {
  id        String   @id @default(uuid())
  order     Order    @relation(fields: [orderId], references: [id])
  orderId   String
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem {
  id        String   @id @default(uuid())
  order     Order    @relation(fields: [orderId], references: [id])
  orderId   String
  product   Product
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem {
  id        String   @id @default(uuid())
  order     Order    @relation(fields: [orderId], references: [id])
  orderId   String
  product   Product  @relation(
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem {
  id        String   @id @default(uuid())
  order     Order    @relation(fields: [orderId], references: [id])
  orderId   String
  product   Product  @relation(fields: [product
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem {
  id        String   @id @default(uuid())
  order     Order    @relation(fields: [orderId], references: [id])
  orderId   String
  product   Product  @relation(fields: [productId], references:
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem {
  id        String   @id @default(uuid())
  order     Order    @relation(fields: [orderId], references: [id])
  orderId   String
  product   Product  @relation(fields: [productId], references: [id])
```


## License: unknown
https://github.com/misterioso013/openorder/blob/91a1179d574e14b37e56bb5617db8f9e44a03e46/prisma/schema.prisma

```
@default(now())
}

model OrderItem {
  id        String   @id @default(uuid())
  order     Order    @relation(fields: [orderId], references: [id])
  orderId   String
  product   Product  @relation(fields: [productId], references: [id])
  productId String
```

