export const FundsTestIds = {
  screen: 'funds-screen',
  /** Tabs: overview / income / expenses. */
  incomeTab: 'funds-income-tab',
  expensesTab: 'funds-expenses-tab',
  /** Add income / add expense entry points. */
  addIncomeButton: 'funds-add-income-button',
  addExpenseButton: 'funds-add-expense-button',
  /** Suffix transaction rows with the id at call sites: `${transactionCard}-${id}`. */
  transactionCard: 'funds-transaction-card',
  transactionForm: 'funds-transaction-form',
  editTransactionButton: 'funds-edit-transaction-button',
  deleteTransactionButton: 'funds-delete-transaction-button',
  deleteTransactionConfirm: 'funds-delete-transaction-confirm',
  amountInput: 'funds-amount-input',
  /** Balance / CAMT import affordances. */
  updateBalanceButton: 'funds-update-balance-button',
  camtImportButton: 'funds-camt-import-button',
} as const;
