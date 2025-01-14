/*
  Warnings:

  - Made the column `emoji` on table `Projects` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `Projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Projects" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "emoji" SET NOT NULL,
ALTER COLUMN "emoji" SET DATA TYPE TEXT,
ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "color" SET DATA TYPE TEXT;
