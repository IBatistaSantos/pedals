-- CreateTable
CREATE TABLE "Subscribe" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "ride_id" TEXT NOT NULL,
    "subscription_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subscribe" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscribe" ADD FOREIGN KEY ("ride_id") REFERENCES "Pedals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
