import React, { useState } from "react";
import SingleExpenseItem from "./SingleExpenseItem";
import NewPurchaseForm from "../forms/NewPurchaseForm"
import axios from "axios";



const BASE_URL = "http://localhost:3000";

function SingleExpenses({ budget, budgetExpenses, addPurchase, refreshBudget, deletePurchase, budgetUsed }) {
    const [budgets, setBudgets] = useState([])
    const [isAddingPurchase, setAddingPurchase] = useState(false)
    //


    function handleAddExpense() {
        setAddingPurchase(true)
    }
    function handleDoneAdding() {
        setAddingPurchase(false)
    }
    //


    return (
        <div className="home-card">

            {isAddingPurchase ? (
                <div className="card-head">
                    <NewPurchaseForm addPurchase={addPurchase} handleDoneAdding={handleDoneAdding} />
                </div>
            ) : (
                <div className="card-head">
                    <div className="purchases-expense-card">
                        <div className="home-card-heading">Purchases</div>

                        <div className="home-card-icon" onClick={(e) => { setAddingPurchase(true) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                        </div>

                    </div>
              


                </div>
            )
            }
            <div className="expense-item">
                {budget.map((item, index) => (
                    <SingleExpenseItem
                        amount={item.amount}
                        description={item.description}
                        date={item.date}
                        id={item.id}
                        key={index}
                        deletePurchase={deletePurchase} />
                ))}
            </div>
        </div>
    )
}

export default SingleExpenses

/**
 *    <div className="expenses-chart"> 
                        <ExpensesChart budget={budget} budgetUsed={budgetUsed} />
                    </div>
 */