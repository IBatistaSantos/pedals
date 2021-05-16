import { PrismaClient as Client } from "@prisma/client";

 class  PrismaClient {
  private static instance: Client;

 public static getInstance(): Client {
    if (!PrismaClient.instance) {
     PrismaClient.instance = new Client();
    }
    return this.instance;
  }
}

export {PrismaClient}