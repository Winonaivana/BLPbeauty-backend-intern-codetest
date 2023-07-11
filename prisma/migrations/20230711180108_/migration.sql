/*
  Warnings:

  - You are about to drop the column `done` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "done",
ALTER COLUMN "startDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "finishDate" DROP NOT NULL;
