-- CreateTable
CREATE TABLE "Book" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookTag" (
    "bookId" INTEGER NOT NULL,
    "tagName" TEXT NOT NULL,

    PRIMARY KEY ("bookId","tagName")
);

-- CreateTable
CREATE TABLE "Tag" (
    "name" TEXT NOT NULL,

    PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBookLibrary" (
    "bookId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("bookId","userId")
);

-- CreateTable
CREATE TABLE "UserBookRate" (
    "bookId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,

    PRIMARY KEY ("bookId","userId")
);

-- CreateTable
CREATE TABLE "UserToken" (
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,

    PRIMARY KEY ("userId","token")
);

-- AddForeignKey
ALTER TABLE "BookTag" ADD FOREIGN KEY("bookId")REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookTag" ADD FOREIGN KEY("tagName")REFERENCES "Tag"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBookLibrary" ADD FOREIGN KEY("bookId")REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBookLibrary" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBookRate" ADD FOREIGN KEY("bookId")REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBookRate" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToken" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
