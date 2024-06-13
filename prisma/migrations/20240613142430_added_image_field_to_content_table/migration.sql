-- DropForeignKey
ALTER TABLE `categorycontent` DROP FOREIGN KEY `CategoryContent_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `categorycontent` DROP FOREIGN KEY `CategoryContent_content_id_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_content_id_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `contenttag` DROP FOREIGN KEY `ContentTag_content_id_fkey`;

-- DropForeignKey
ALTER TABLE `contenttag` DROP FOREIGN KEY `ContentTag_tag_id_fkey`;

-- AlterTable
ALTER TABLE `content` ADD COLUMN `image` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `Content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentTag` ADD CONSTRAINT `ContentTag_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `Content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentTag` ADD CONSTRAINT `ContentTag_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryContent` ADD CONSTRAINT `CategoryContent_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `Content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryContent` ADD CONSTRAINT `CategoryContent_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
