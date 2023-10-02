import React, { useState } from "react";

function SingleExpenseItem({ amount, description, date, id, deletePurchase }) {
    const [value, setValue] = useState(null)
    const [isEditing, setEditing] = useState(false)

    function formatDate(inputDate) {
        const dateParts = inputDate.split('-');

        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);

        return `${month}/${day}`;
    }



    return (
        <div className="single-expense-item">
            <div className="single-expense-container">
                <div className="single-expense-primary-value">
                    ${amount}.00 {description}
                </div>
                <div className="single-expense-secondary-value">
                    {formatDate(date)}
                </div>
            </div>
            <div className="single-expense-container">
                <div className="expense-item-delete" onClick={(e) => { deletePurchase(id) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </div>
            </div>
        </div>
    )
}

export default SingleExpenseItem