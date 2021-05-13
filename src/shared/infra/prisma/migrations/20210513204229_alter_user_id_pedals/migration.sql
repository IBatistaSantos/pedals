/*
  Warnings:

  - Added the required column `userId` to the `Pedals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pedals" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pedals" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
