/*
  Warnings:

  - Added the required column `isNew` to the `Visitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `visitor` ADD COLUMN `isNew` BOOLEAN NOT NULL;
