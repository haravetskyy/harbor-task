/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emoji,color]` on the table `Projects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Projects_name_key" ON "Projects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_emoji_color_key" ON "Projects"("emoji", "color");
