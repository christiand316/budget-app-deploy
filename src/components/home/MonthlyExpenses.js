import React, { useState } from "react";
import MonthlyExpenseItem from "./MonthlyExpenseItem";
import NewExpensesForm from "../forms/NewExpensesForm"
import ExpensesChart from "./ExpensesChart";
import axios from "axios";


const BASE_URL = "http://localhost:3000";

function MonthlyExpenses({ budget, budgetExpenses, addExpense, refreshBudget, budgetUsed }) {
  const [isEditing, setEditing] = useState(false)
  const [isAddingPurchase, setAddingPurchase] = useState(false)



  function handleDoneAdding() {
    setAddingPurchase(false)
  }



  async function deleteExpense(id) {
    await axios.delete(`${BASE_URL}/api/recurringtransactions/${id}`).then((res) => res.data);
    refreshBudget()
  }


  const expensesChartColors = ["#0E1212", "#F06449", "#D3CC00", "#12EAEA", "#55828B", "#272924", "#54D180"] // debt, 1stExpense, 2ndExpense, 3rdExpense, 4thExpense, backgroundColor, expenseOverflow

  return (
    <div className="home-card">
      {isAddingPurchase ? (
        <div className="card-head">
          <NewExpensesForm addExpense={addExpense} handleDoneAdding={handleDoneAdding} />
        </div>
      ) : (
        <div className="card-head">
          <div className="purchases-expense-card">
            <div>
              <div className="home-card-heading">Monthly Expenses</div>
              <div className="expenses-total"> ${budgetUsed.monthlyExpenseTotal.toLocaleString()}</div>
            </div>

            <div className="home-card-icon" onClick={(e) => { setAddingPurchase(true) }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            </div>
          </div>



        </div>
      )}

      <div className="expenses-chart">
        <ExpensesChart budget={budget} budgetUsed={budgetUsed} expensesChartColors={expensesChartColors} />
      </div>

      {isEditing ? (
        <>
          <div className="expenses-edit" onClick={(e) => { setEditing(false) }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
          </div>
          


          <div className="monthly-expense-item">
            <div className="monthly-expense-text"><p>${budgetUsed.debtTotal.toLocaleString()}   Debt</p> </div>
            <div className="monthly-expense-legend">
              <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" rx="7" ry="7" fill={expensesChartColors[0]} />
              </svg>
            </div>
          </div>

          {budgetExpenses.map((item, index) => (
            <MonthlyExpenseItem
              amount={item.amount}
              description={item.description}
              id={item.id}
              index={index}
              deleteExpense={deleteExpense}
              expensesChartColors={expensesChartColors}
              canDelete={true} />
          ))}
        </>
      ) : (
        <>
          <div className="expenses-edit" onClick={(e) => { setEditing(true) }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
          </div>



          <div className="monthly-expense-item">
            <div className="monthly-expense-text"><p>${budgetUsed.debtTotal.toLocaleString()}   Debt</p> </div>
            <div className="monthly-expense-legend">
              <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" rx="7" ry="7" fill={expensesChartColors[0]} />
              </svg>
            </div>
          </div>

          {budgetExpenses.map((item, index) => (
            <MonthlyExpenseItem
              amount={item.amount}
              description={item.description}
              id={item.id}
              index={index}
              deleteExpense={deleteExpense}
              expensesChartColors={expensesChartColors}
              canDelete={false}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default MonthlyExpenses





/**
 * 
        <div className="card">
            <div>
                <h1>Monthly Expenses</h1><button className="add-expense" onClick={handleAddExpense}>+</button>
                <p>{ limit }</p>
            </div>
            <div>
                <h1>bar visualizing expenses</h1>
            </div>
           

      { budget ? (
        <>
        <div>
        {budget.map((item, index) => (
        <MonthlyExpenseItem 
        amount={item.amount}
        description={item.description}

        key={index} deleteTodo={deleteTodo} updateTask={updateTask} />
      ))} 
        </div>
        </>
      ) : (
        <div> no items... </div>
      )}
            
        </div>
    )
 */



/**
 * 
 *     function addTodo(budgets) {
        setBudgets([
          ...budgets,
          { id: uuid(), task: budgets, completed: false },
        ]);
      }

 */