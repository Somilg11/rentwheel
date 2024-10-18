/*
  Warnings:

  - You are about to drop the column `modelName` on the `CarType` table. All the data in the column will be lost.
  - Added the required column `model` to the `CarType` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `transmission` on the `CarType` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CarType" DROP COLUMN "modelName",
ADD COLUMN     "model" TEXT NOT NULL,
DROP COLUMN "transmission",
ADD COLUMN     "transmission" TEXT NOT NULL;
