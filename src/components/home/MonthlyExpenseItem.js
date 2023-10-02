import React, { useState } from "react";

function MonthlyExpenseItem({ amount, description, deleteExpense, id, canDelete, index, expensesChartColors }) {
    const [value, setValue] = useState(null)
    const [isEditing, setEditing] = useState(false)



    const handleSubmit = (e) => {
        e.preventDefault()
        setEditing(false)
    }

    const fillChartColors = expensesChartColors.slice(1, 5)

    return (
        canDelete ? (

            <>
                {index < 4 ? (
                    <div className="monthly-expense-item ">
                        <div className="monthly-expense-text">
                            <p>${amount.toLocaleString()}   {description}</p>
                        </div>

                        <div className="monthly-expense-legend">
                            <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100%" height="100%" rx="7" ry="7" fill={fillChartColors[index]} />
                            </svg>
                        </div>

                        <div className="expense-item-delete icon-align-right icon-align-top" onClick={(e) => { deleteExpense(id) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </div>
                    </div>
                ) : (
                    <div className="monthly-expense-item monthly-expense-item-overflow">
                        <div className="monthly-expense-text">
                            <p>${amount.toLocaleString()}   {description}</p>
                        </div>

                        <div className="monthly-expense-legend ">
                            <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100%" height="100%" rx="7" ry="7" fill={expensesChartColors[6]} />
                            </svg>
                        </div>


                        <div className="expense-item-delete icon-align-right icon-align-top" onClick={(e) => { deleteExpense(id) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </div>
                    </div>
                )}
            </>

        ) : (




            <>
                {index < 4 ? (
                    <div className="monthly-expense-item ">
                        <div className="monthly-expense-text">
                            <p>${amount.toLocaleString()}   {description}</p>
                        </div>

                        <div className="monthly-expense-legend">
                            <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100%" height="100%" rx="7" ry="7" fill={fillChartColors[index]} />
                            </svg>
                        </div>

                        <div className="expense-item-delete icon-align-right icon-align-top"> </div>
                    </div>
                ) : (
                    <div className="monthly-expense-item monthly-expense-item-overflow">
                        <div className="monthly-expense-text">
                            <p>${amount.toLocaleString()}   {description}</p>
                        </div>

                        <div className="monthly-expense-legend ">
                            <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100%" height="100%" rx="7" ry="7" fill={expensesChartColors[6]} />
                            </svg>
                        </div>


                        <div className="expense-item-delete icon-align-right icon-align-top"> </div>
                    </div>
                )}
            </>
        )
    )
}

export default MonthlyExpenseItem


/*

    function handleDelete() {
        deleteTodo(task.id)
    }

    function handleEdit() {
        setEditing(true)
        updateTask(task.id)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateTask(value, task.id);
        setEditing(false)
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }
*/