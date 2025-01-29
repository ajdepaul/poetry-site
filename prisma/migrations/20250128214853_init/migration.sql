-- CreateTable
CREATE TABLE "poem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL,
    "precedence" INTEGER NOT NULL DEFAULT 0,
    "deleted_on" TIMESTAMP(3),

    CONSTRAINT "poem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "poem_title_key" ON "poem"("title");
