/*
  Warnings:

  - You are about to drop the column `brand` on the `CarType` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `CarType` table. All the data in the column will be lost.
  - You are about to drop the column `seatCapacity` on the `CarType` table. All the data in the column will be lost.
  - Changed the type of `gender` on the `Admin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `condition` to the `CarType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuelType` to the `CarType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `CarType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `CarType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerDay` to the `CarType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seats` to the `CarType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `CarType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `CarType` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `transmission` on the `CarType` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('Petrol', 'Diesel', 'Electric', 'Hybrid');

-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('Excellent', 'Good');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('active', 'unsubscribed');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'active', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "CarStatus" AS ENUM ('Available', 'Rented', 'Maintenance');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('SUV', 'Sedan', 'Truck', 'Coupe', 'Convertible', 'Hatchback', 'Minivan', 'Other');

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;

-- AlterTable
ALTER TABLE "CarType" DROP COLUMN "brand",
DROP COLUMN "model",
DROP COLUMN "seatCapacity",
ADD COLUMN     "condition" "Condition" NOT NULL,
ADD COLUMN     "fuelType" "FuelType" NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "pricePerDay" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "seats" INTEGER NOT NULL,
ADD COLUMN     "status" "CarStatus" NOT NULL,
ADD COLUMN     "type" "VehicleType" NOT NULL,
DROP COLUMN "transmission",
ADD COLUMN     "transmission" "Transmission" NOT NULL;

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL,
    "subscribedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "customerName" TEXT NOT NULL,
    "vehicleName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");
