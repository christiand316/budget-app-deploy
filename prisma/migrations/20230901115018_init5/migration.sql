/*
  Warnings:

  - You are about to drop the `MonthlyExpenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecurringTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `recurringTransactionId` on the `Debt` table. All the data in the column will be lost.
  - Added the required column `budgetId` to the `Debt` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MonthlyExpenses";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RecurringTransaction";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "MonthlyExpense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "budgetId" TEXT NOT NULL,
    CONSTRAINT "MonthlyExpense_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Debt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "rate" REAL NOT NULL,
    "startTerm" TEXT NOT NULL,
    "totalTerm" INTEGER NOT NULL,
    "totalAmount" REAL NOT NULL,
    "budgetId" TEXT NOT NULL,
    CONSTRAINT "Debt_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Debt" ("description", "id", "rate", "startTerm", "totalAmount", "totalTerm") SELECT "description", "id", "rate", "startTerm", "totalAmount", "totalTerm" FROM "Debt";
DROP TABLE "Debt";
ALTER TABLE "new_Debt" RENAME TO "Debt";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
