-- DropIndex
DROP INDEX "public"."User_oauthProvider_oauthId_key";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiry" TIMESTAMP(3);
