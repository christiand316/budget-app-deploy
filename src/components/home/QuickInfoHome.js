import React, { useState } from "react";
import axios from "axios";

import HomeChart from "./HomeChart";
const BASE_URL = "http://localhost:3000";

function QuickInfo({ budget, budgetUsed, refreshBudget }) {
    const [value, setValue] = useState("")
    const [isEditingBudget, setEditingBudget] = useState(false)
    const [showError, setShowError] = useState("")




    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();  // Month is 0 indexed so increment +1 for correct month
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();


    const totalDaysInMonth = getDaysInMonth(year, month);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (value.length <= 0 || value.length >= 26 || isNaN(parseInt(value))) {
            setShowError("Input only numbers- no symbols.")
            return
        } else {
            const data = {
                groupId: budget.groupId,
                budgetAmount: parseInt(value)
            }

            try {
                await axios.patch(`${BASE_URL}/api/budgets/${budget.id}`, data)
                await refreshBudget()
                setShowError('')
                setEditingBudget(false)
            } catch (error) {
                console.error(error);
                setEditingBudget(false)
            }
        }
    }
    if (budget.budgetAmount == undefined) {
        return (
            <div className="quickinfo-card home-card">
                <>
                    <div className="quickinfo-info-container">


                        <div className="quickinfo-subcontainer">
                            <div className="quickinfo-highlighted">
                                <div className="primary-value">$ 00.00 </div>
                                <div className="secondary-value"> /00.00</div>
                            </div>
                            <div className="primary-value-text">budget left</div>
                        </div>

                        <div className="quickinfo-subcontainer">
                            <div className="quickinfo-highlighted">
                                <div className="primary-value"> {totalDaysInMonth - dayOfMonth} </div>
                                <div className="secondary-value month-value"> /{totalDaysInMonth} </div>
                            </div>
                            <div className="primary-value-text">days left in {monthNames[month]}</div>

                        </div>

                        <div className="quickinfo-subcontainer setting-cog" onClick={(e) => { setEditingBudget(true) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                        </div>

                    </div>
                    <div className="home-chart">
                        <HomeChart budget={budget} budgetUsed={budgetUsed} />
                    </div>
                </>
            </div>
        )
    }
    return (
        <div className="quickinfo-card home-card">
            {isEditingBudget ? (
                <div>
                    <form className="home-form" onSubmit={handleSubmit} >
                        <input type="text" placeholder="Set budget amount" value={value} onChange={(e) => { setValue(e.target.value) }} />

                        <div className="home-card-icon expense-add-icon-align expense-form-icons" onClick={(e) => { setEditingBudget(false) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-undo-2"><path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" /></svg>
                        </div>
                        <button type="submit" >
                            <div className="home-card-icon expense-form-icons">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                            </div>
                        </button>
                    </form>
                    <div className="center-align">{showError}</div>
                </div>
            ) : (

                <>
                    <div className="quickinfo-info-container">


                        <div className="quickinfo-subcontainer">
                            <div className="quickinfo-highlighted">
                                <div className="primary-value">${(budget.budgetAmount - (budgetUsed.oneTimeTransactionTotal + budgetUsed.monthlyExpenseTotal)).toLocaleString()}.00 </div>
                                <div className="secondary-value"> /{budget.budgetAmount.toLocaleString()}.00</div>
                            </div>
                            <div className="primary-value-text">budget left</div>
                        </div>

                        <div className="quickinfo-subcontainer">
                            <div className="quickinfo-highlighted">
                                <div className="primary-value"> {totalDaysInMonth - dayOfMonth} </div>
                                <div className="secondary-value month-value"> /{totalDaysInMonth} </div>
                            </div>
                            <div className="primary-value-text">days left in {monthNames[month]}</div>

                        </div>

                        <div className="quickinfo-subcontainer setting-cog" onClick={(e) => { setEditingBudget(true) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                        </div>

                    </div>
                    <div className="home-chart">
                        <HomeChart budget={budget} budgetUsed={budgetUsed} />
                    </div>
                </>
            )}
        </div >
    )
}

export default QuickInfo