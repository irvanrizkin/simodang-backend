-- DropForeignKey
ALTER TABLE `Pond` DROP FOREIGN KEY `Pond_deviceId_fkey`;

-- AlterTable
ALTER TABLE `Pond` MODIFY `deviceId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Pond` ADD CONSTRAINT `Pond_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `Device`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
