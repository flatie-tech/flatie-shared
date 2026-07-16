import type { TransactionCategory, TransactionType } from '../enums/status.enum';
import type { BaseEntity, BuildingEntity } from './base-entity.types';

/**
 * Building fund/balance entity
 */
export interface BuildingFund extends BuildingEntity {
  initialBalance: number;
  currentBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

/**
 * Financial summary for a building
 */
export interface FinancialSummary {
  currentBalance: number;
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  period: {
    start: string;
    end: string;
  };
}

/**
 * Financial graph data point
 */
export interface FinancialGraphData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

/**
 * Income/expense transaction
 */
export interface Transaction extends BaseEntity {
  buildingId: string;
  title?: string;
  description: string;
  amount: number;
  date: string | Date;
  type: TransactionType;
  category: TransactionCategory;
  frequency?: string;
  currency?: string;
}

/**
 * Create transaction request
 */
export interface CreateTransactionRequest {
  buildingId: string;
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
  category: TransactionCategory;
  title?: string;
  frequency?: string;
}

/**
 * Recurring transaction template.
 *
 * @deprecated Zero consumers — the backend never implemented recurring
 * templates (the `FUNDS.RECURRING_TEMPLATE*` routes are phantoms) and
 * mobile's dead recurring-templates feature uses its own local type and is
 * slated for deletion. Will be removed in v0.60.0.
 */
export interface RecurringTemplate extends BaseEntity {
  buildingId: string;
  title: string;
  description?: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  frequency: string;
  startDate: string | Date;
  endDate?: string | Date | null;
  isActive: boolean;
  lastGeneratedAt?: string | Date | null;
}

/**
 * Create recurring template request.
 *
 * @deprecated Zero consumers — see {@link RecurringTemplate}. Will be removed in v0.60.0.
 */
export interface CreateRecurringTemplateRequest {
  buildingId: string;
  title: string;
  description?: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  frequency: string;
  startDate: string;
  endDate?: string;
}
