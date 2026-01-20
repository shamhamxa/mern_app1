/*
  Warnings:

  - The primary key for the `auth` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `auth` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `data` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - Made the column `username` on table `auth` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `auth` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "auth" DROP CONSTRAINT "auth_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ADD CONSTRAINT "auth_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "data" DROP CONSTRAINT "data_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ADD CONSTRAINT "data_pkey" PRIMARY KEY ("id");
