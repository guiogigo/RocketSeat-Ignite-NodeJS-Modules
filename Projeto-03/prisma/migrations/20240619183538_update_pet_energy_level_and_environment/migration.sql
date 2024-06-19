/*
  Warnings:

  - You are about to drop the column `local` on the `pets` table. All the data in the column will be lost.
  - Added the required column `energy_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `environment` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "local",
ADD COLUMN     "energy_level" TEXT NOT NULL,
ADD COLUMN     "environment" TEXT NOT NULL;
