import React, { useState } from 'react'

function NewDebtForm({ addDebt, handleDoneAdding }) {
  const [costValue, setCostValue] = useState('')
  const [termValue, setTermValue] = useState('')
  const [lengthValue, setlengthValue] = useState('')
  const [rateValue, setRateValue] = useState('')
  const [nameValue, setNameValue] = useState('')

  const [selectedMonthYear, setSelectedMonthYear] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  const [showError, setShowError] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault()
    let parsedRate = parseFloat(rateValue).toFixed(2)


    if (costValue.length <= 0 || lengthValue.length <= 0 || rateValue.length <= 0 || nameValue.length <= 0 || formattedDate.length <= 0) {
      setShowError("Please fill out the entire form.")
      return
    }
    if (nameValue.length >= 26) {
      setShowError("Use only standard characters. Max length 26.")
      return
    }
    if (lengthValue.length >= 26 || isNaN(parseFloat(parsedRate))) {
      setShowError("Input only numbers- no symbols.")
      return
    }
    if (formattedDate.length >= 26) {
      setShowError("Use only standard characters. Max length 26.")
      return
    }
    if (lengthValue.length >= 26 || isNaN(parseInt(lengthValue))) {
      setShowError("Input only numbers- no symbols.")
      return
    }
    if (costValue.length >= 26 || isNaN(parseInt(costValue))) {
      setShowError("Input only numbers- no symbols.")
      return
    }

    const resObj = {
      description: nameValue,
      rate: parseFloat(parsedRate),
      startTerm: formattedDate,
      totalTerm: parseInt(lengthValue),
      totalAmount: parseInt(costValue)
    }

    try {
      addDebt(resObj)
      setShowError('')
      handleDoneAdding(false)
    } catch (error) {
      console.error(error)
      setShowError('')
      handleDoneAdding(false)
    }
  }


  const handleTermChange = (e) => {
    const inputMonthYear = e.target.value;
    setSelectedMonthYear(inputMonthYear);

    // Split the input value into year and month parts
    const [year, month] = inputMonthYear.split('-');

    // Check if the month is less than 10 and remove the leading zero if present
    const formattedMonth = parseInt(month) < 10 ? month.substring(1) : month;

    // Construct the formatted date with a zero-prefixed or non-zero-prefixed month
    const formatted = `${year}-${formattedMonth}-1`;

    setFormattedDate(formatted);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="debt-form">

        <input type="text" value={nameValue} onChange={(e) => {
          setNameValue(e.target.value)
        }} className="todo-input" placeholder='Debt description' />
        <input type="text" value={costValue} onChange={(e) => {
          setCostValue(e.target.value)
        }} className="todo-input" placeholder='Total amount' />
        <input type="month" value={selectedMonthYear} onChange={handleTermChange} className="todo-input" placeholder='Start of term' />
        <input type="text" value={lengthValue} onChange={(e) => {
          setlengthValue(e.target.value)
        }} className="todo-input" placeholder='Length of term in months' />
        <input type="text" value={rateValue} onChange={(e) => {
          setRateValue(e.target.value)
        }} className="todo-input" placeholder='Interest rate' />

        <div className="home-card-icon expense-add-icon-align expense-form-icons" onClick={(e) => { handleDoneAdding(false) }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-undo-2"><path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" /></svg>
        </div>

        <button type="submit">
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

export default NewDebtForm

/**
 *    description: string;
    totalAmount: number;
    rate: number;
    budgetId: string;
    startTerm: string;
    totalTerm: number;
    
 */