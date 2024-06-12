-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `Content_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
