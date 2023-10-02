import React, { useState, useEffect } from 'react';
import MonthlyExpenses from '../components/home/MonthlyExpenses';
import QuickInfoHome from '../components/home/QuickInfoHome';
import SingleExpenses from '../components/home/SingleExpenses';
import axios from "axios";



const BASE_URL = "http://localhost:3000";


export function Home({ group }) {
  //const [budget, setBudget] = useState(budgetProp.budget)
  const [budget, setBudget] = useState(null)
  const [loading, isLoading] = useState(null)
  const [budgetUsed, setBudgetUsed] = useState(null)

  function calculateMonthlyPayment(totalAmount, rate, totalTerm) {
    const monthlyInterestRate = rate / 12 / 100;

    const monthlyPayment = (totalAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalTerm))) / (Math.pow(1 + monthlyInterestRate, totalTerm) - 1);

    return monthlyPayment
  }

  function getBudgetUsed() {

    let budgetTotal = {
      oneTimeTransactionTotal: 0,
      monthlyExpenseTotal: 0,
      debtTotal: 0
    }
    budget.oneTimeTransaction.forEach((val) => {
      budgetTotal.oneTimeTransactionTotal += val.amount
    })
    budget.monthlyExpense.forEach((val) => {
      budgetTotal.monthlyExpenseTotal += val.amount
    })
    budget.debt.forEach((val) => {
      const monthlyDebtPayment = calculateMonthlyPayment(val.totalAmount, val.rate, val.totalTerm).toFixed(0)
    
      budgetTotal.debtTotal += parseInt(monthlyDebtPayment)
    })
    setBudgetUsed(budgetTotal)
  }

  useEffect(() => {
    isLoading(true)
    async function fetchUserData() {

      try {
        if (!group) {
          return;
        }
        await refreshBudget()
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserData();
    isLoading(false)
  }, [])

  useEffect(() => {
    if (budget !== null) {
      getBudgetUsed()
    }
  }, [budget])

  function formatDateToYearMonthDay() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1);
    const day = String(today.getDate());

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  async function addExpense(addObj) {
    const amountInt = parseInt(addObj.amount)
    const data = {
      budgetId: budget.id,
      description: addObj.description,
      amount: amountInt
    }
    await axios.post(`${BASE_URL}/api/recurringtransactions`, data)

    refreshBudget()
  }

  async function addPurchase(addObj) {

    const amountInt = parseInt(addObj.amount)

    const data = {
      budgetId: budget.id,
      description: addObj.description,
      amount: amountInt,
      date: formatDateToYearMonthDay()
    }

    await axios.post(`${BASE_URL}/api/onetimetransactions`, data)

    refreshBudget()

  }
  async function deletePurchase(id) {

    await axios.delete(`${BASE_URL}/api/onetimetransactions/${id}`).then((res) => res.data);
    refreshBudget()
  }

  async function refreshBudget() {
    const resBudget = await axios
      .get(`${BASE_URL}/api/budgets/${group.id}`)
      .then((res) => res.data);


    setBudget(
      resBudget
    )
    if (budget) {
      getBudgetUsed()
    }
  }

  return (
    <section>

      {budget && budgetUsed ? (
        <div>
          <QuickInfoHome budget={budget} budgetUsed={budgetUsed} refreshBudget={refreshBudget}/>
          <SingleExpenses budget={budget.oneTimeTransaction} addPurchase={addPurchase} deletePurchase={deletePurchase} />
          <MonthlyExpenses budget={budget} budgetExpenses={budget.monthlyExpense} debt={budget.debt} addExpense={addExpense} refreshBudget={refreshBudget} budgetUsed={budgetUsed} />
        </div>
      ) : (
        <p> Loading... </p>
      )
      }

    </section>
  );
}