/*
  Warnings:

  - You are about to drop the `contenttag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `contenttag` DROP FOREIGN KEY `ContentTag_content_id_fkey`;

-- DropForeignKey
ALTER TABLE `contenttag` DROP FOREIGN KEY `ContentTag_tag_id_fkey`;

-- DropTable
DROP TABLE `contenttag`;

-- DropTable
DROP TABLE `tag`;
