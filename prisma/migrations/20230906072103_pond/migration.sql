-- CreateTable
CREATE TABLE `Pond` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `address` VARCHAR(191) NOT NULL DEFAULT '',
    `city` VARCHAR(191) NOT NULL DEFAULT '',
    `seedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `imageUrl` VARCHAR(191) NOT NULL DEFAULT 'https://placehold.co/1280x720.png',
    `status` INTEGER NOT NULL DEFAULT 1,
    `isFilled` INTEGER NOT NULL DEFAULT 1,
    `userId` INTEGER NOT NULL,
    `deviceId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Pond_deviceId_key`(`deviceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pond` ADD CONSTRAINT `Pond_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pond` ADD CONSTRAINT `Pond_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `Device`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
