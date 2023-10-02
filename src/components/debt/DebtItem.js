import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

function DebtItem({ description, totalAmount, totalTerm, startTerm, rate, id, budgetId, refreshBudget }) {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(totalAmount);
  const [isConfirming, setIsConfirming] = useState(false)

  function handleDeletePopup() {
    setIsConfirming(true)
  }
  async function handleDelete(id) {
    await axios.delete(`${BASE_URL}/api/debt/${id}`)
    setIsConfirming(false)
    setEditing(false)
    refreshBudget()
  }


  function handleDebtEdit() {
    setEditing(true);
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const patchObj = {
      budgetId: budgetId,
      description: description,
      rate: parseInt(rate),
      startTerm: startTerm,
      totalTerm: parseInt(totalTerm),
      totalAmount: parseInt(value)
    }

    await axios.patch(`${BASE_URL}/api/debt/${id}`, patchObj).then((res) => res.data);

    refreshBudget();
    setEditing(false)
  }




  function monthsPassedSince(date) {
    const currentDate = new Date();
    const termDate = new Date(date);

    const monthsDiff = (currentDate.getFullYear() - termDate.getFullYear()) * 12 + (currentDate.getMonth() - termDate.getMonth());

    return monthsDiff;
  }

  const date = new Date(startTerm);
  const termRemaining = totalTerm - monthsPassedSince(date);

  let debtObj;
  function calculateMonthlyPayment(totalAmount, rate, totalTerm) {
    const monthlyInterestRate = rate / 12 / 100;


    const monthlyPayment =
      (totalAmount *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, totalTerm))) /
      (Math.pow(1 + monthlyInterestRate, totalTerm) - 1);


    const monthlyPrinciple = totalAmount / totalTerm;
    const date = new Date(startTerm);
    const termRemaining = totalTerm - monthsPassedSince(date);

    debtObj = {
      ...debtObj,
      paidAmount: Math.round(monthlyPrinciple) * termRemaining,
      monthlyAmount: Math.round(monthlyPayment),
      monthlyPrinciple: monthlyPrinciple,
      lostAmount: (monthlyPayment - monthlyPrinciple).toFixed(2),
      termRemaining: termRemaining
    }
    return Math.round(monthlyPayment);
  }

  calculateMonthlyPayment(totalAmount, rate, totalTerm)

  return (

    <div className="debt-card debt-item">
  
        {isEditing ? (
          <>
            <div>
              <form className="debt-form" onSubmit={handleSubmit} >
                <input
                  type="text"
                  value={value}
                  onChange={handleChange}
                  placeholder="What is the task today?"
                />

                <div class="home-card-icon expense-add-icon-align expense-form-icons" onClick={() => { setEditing(false) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-undo-2"><path d="M9 14 4 9l5-5"></path><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"></path></svg>
                </div>

                <button type="submit">
                  <div className="home-card-icon debt-edit-cancel">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right"><path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg>
                  </div>
                </button>
              </form>
            </div>
            <div className="center-align confirm-delete-wrapper">
              {isConfirming ? (
                <div className="confirm-delete-container ">
                  Confirm Deletion

                  <div className="confirm-delete-no" onClick={() => setIsConfirming(false)}>No</div>
                  <div className="confirm-delete-yes" onClick={() => handleDelete(id)}>Yes</div>

                </div>
              ) : (
                <div className="group-delete-icon group-icon" onClick={() => setIsConfirming(true)}>
                  <button onClick={handleDeletePopup}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg></button>
                </div>
              )}


            </div>
          </>
        ) : (

          <>
          <div className="debt-description">
            <div className="description">
              <p>{description}</p>
            </div>

            <div className="edit">
              <button onClick={handleDebtEdit}>

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>

              </button>
            </div>

            <div className="">
              <div className="debt-amount">
                <div className="debt-value">       ${`${( debtObj.monthlyPrinciple * termRemaining ).toFixed().toLocaleString()}`}     </div> / <div className="debt-greyed-value">${totalAmount.toLocaleString()}</div>
              </div>


              <div className="debt-term">
                <div className="debt-value"> {debtObj.termRemaining} months </div>  /  <div className="debt-greyed-value"> {totalTerm} months </div>
              </div>
            </div>


            <div className="debt-overview">

              <div className="debt-rate-payment">
                ${debtObj.monthlyAmount}/month - {rate}% apr
              </div>

              <div className="debt-lost-interest debt-greyed-value">
                ${(debtObj.monthlyAmount - debtObj.monthlyPrinciple).toFixed(2)} lost to interest
              </div>
            </div>
            </div>
          </>

        )}
      </div>
  )
}


export default DebtItem;
