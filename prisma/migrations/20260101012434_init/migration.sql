-- CreateTable
CREATE TABLE "TaxReturn" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "ssn" TEXT NOT NULL,
    "filingStatus" TEXT NOT NULL,
    "wages" DECIMAL NOT NULL,
    "federalTaxWithheld" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
