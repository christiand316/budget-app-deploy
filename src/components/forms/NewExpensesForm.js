import React, { useState } from 'react'

function NewPurchaseForm({ addExpense, handleDoneAdding }) {
    const [costValue, setCostValue] = useState('')
    const [itemValue, setItemValue] = useState('')
    const [showError, setShowError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (costValue.length <= 0 || costValue.length >= 26 || isNaN(parseInt(costValue))) {
            setShowError("Input only numbers- no symbols.")
            return
        }
        if (itemValue.length <= 0 || itemValue.length >= 26) {
            setShowError("Use only standard characters. Max length 26.")
            return
        }
        const resObj = {
            description: itemValue,
            amount: costValue
        }

        try {
            addExpense(resObj)
            setShowError('')
            handleDoneAdding(false)
        } catch (error) {
            console.error(error);
            setShowError('')
            handleDoneAdding(false)
        }
    }




    const handleCostChange = (e) => {
        setCostValue(e.target.value)
    }
    const handleItemChange = (e) => {
        setItemValue(e.target.value)
    }

    return (
        <>
        <form onSubmit={handleSubmit} className="home-form">
            <input type="text" value={costValue} onChange={(e) => { setCostValue(e.target.value) }} className="todo-input" placeholder='Cost' />
            <input type="text" value={itemValue} onChange={(e) => { setItemValue(e.target.value) }} className="todo-input" placeholder='Item' />
            <div className="home-card-icon expense-add-icon-align expense-form-icons" onClick={(e) => {handleDoneAdding(false)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-undo-2"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
            </div>
            <button type="submit" >
                <div className="home-card-icon expense-form-icons">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                </div>
            </button>
        </form>
            <div className='center-align'>
            {showError}
        </div>
        </>
    )
}

export default NewPurchaseForm