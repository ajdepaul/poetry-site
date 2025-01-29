-- CreateEnum
CREATE TYPE "JustifyDirection" AS ENUM ('START', 'CENTER', 'END');

-- AlterTable
ALTER TABLE "poem" ADD COLUMN     "justifyDirection" "JustifyDirection" NOT NULL DEFAULT 'CENTER';
