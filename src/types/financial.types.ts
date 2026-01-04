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
 * Update transaction request
 */
export interface UpdateTransactionRequest {
  description?: string;
  amount?: number;
  date?: string;
  type?: TransactionType;
  category?: TransactionCategory;
  title?: string;
  frequency?: string;
}

/**
 * Update fund balance request
 */
export interface UpdateFundRequest {
  initialBalance: number;
}

/**
 * Recurring transaction template
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
 * Create recurring template request
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

/**
 * Update recurring template request
 */
export interface UpdateRecurringTemplateRequest {
  title?: string;
  description?: string;
  amount?: number;
  type?: TransactionType;
  category?: TransactionCategory;
  frequency?: string;
  startDate?: string;
  endDate?: string | null;
  isActive?: boolean;
}
