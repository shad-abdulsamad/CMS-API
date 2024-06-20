-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_content_id_fkey`;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `Content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
