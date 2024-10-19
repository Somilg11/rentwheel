/*
  Warnings:

  - You are about to drop the column `carTypeId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `CarType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `vehicleId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_carTypeId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "carTypeId",
ADD COLUMN     "vehicleId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CarType";

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "pricePerDay" DOUBLE PRECISION NOT NULL,
    "fuelType" "FuelType" NOT NULL,
    "transmission" "Transmission" NOT NULL,
    "condition" "Condition" NOT NULL,
    "status" "CarStatus" NOT NULL,
    "type" "VehicleType" NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
