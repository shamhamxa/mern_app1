-- CreateTable
CREATE TABLE "auth" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "password" TEXT,

    CONSTRAINT "auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT,
    "detail" TEXT,

    CONSTRAINT "data_pkey" PRIMARY KEY ("id")
);
