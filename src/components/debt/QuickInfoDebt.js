import React, { useEffect, useState } from "react"
import DebtChart from './DebtChart'
import NewDebtForm from "../forms/NewDebtForm"
import DebtChartLegend from "./DebtChartLegend"
import axios from "axios"

const BASE_URL = "http://localhost:3000"

function QuickInfoDebt({ budget, budgetId, debtChartColors, refreshBudget }) {
    const [isAddingDebt, setAddingDebt] = useState(false)
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        const res = calculateData()

        setChartData(res)

    }, [])


    function handleAddDebt(resObj) {
        setAddingDebt(true)
    }
    function handleDoneAdding() {
        setAddingDebt(false)
    }

    async function addDebt(addObj) {

        const data = {
            budgetId: budgetId,
            description: addObj.description,
            rate: addObj.rate,
            startTerm: addObj.startTerm,
            totalTerm: addObj.totalTerm,
            totalAmount: parseInt(addObj.totalAmount),
        }


        try {
            await axios.post(`${BASE_URL}/api/debt`, data)
            refreshBudget()
        } catch (error) {
            setAddingDebt(false)
            console.error(error)
        }
    }


    function calculateMonthlyPayment(totalAmount, rate, totalTerm) {
        const monthlyInterestRate = rate / 12 / 100;

        const monthlyPayment = (totalAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalTerm))) / (Math.pow(1 + monthlyInterestRate, totalTerm) - 1);

        return monthlyPayment
    }

    function calculateData() {
        let dataArr = []
        budget.forEach((val) => {
            const dataEntry = {
                name: val.description,
                value: calculateMonthlyPayment(val.totalAmount, val.rate, val.totalTerm).toFixed(0),
                id: val.id
            }
            dataArr.push(dataEntry)
        })
        return populateData(dataArr.sort((a, b) => b["value"] - a["value"]))
    }

    function populateData(sortedArr) {

        let data = []

        if (sortedArr.length > 5) {
            for (let i = 0; i < 5; i++) {
                data.push(sortedArr[i])
            }
            let slicedSortedArr = sortedArr.slice(5)
            slicedSortedArr.reduce((acc, cur) => acc + cur.value)

            data.push({ name: "Other", value: (slicedSortedArr.reduce((acc, cur) => acc + parseInt(cur.value), 0)) })

            return data
        }

        for (let i = 0; i < sortedArr.length; i++) {
            data.push(sortedArr[i])
        }
        return data
    }
   
    if (chartData) {
        
        return (
            <div className="quickinfo-debt-card debt-card">
                {isAddingDebt ? (
                    <>
                        <NewDebtForm addDebt={addDebt} handleDoneAdding={handleDoneAdding} />
                    </>
                ) : (
                    <div>
                        <div className="quickinfo-debt quickinfo-debt-form">
                            <div className="debt-chart">
                                <DebtChart budget={budget} debtChartColors={debtChartColors} chartData={chartData} />
                            </div>

                            <div className="debt-helpers-container">
                                <div className="legend-debt">
                                    {chartData.map((item, index) => (
                                        <DebtChartLegend
                                            description={item.name}
                                            color={debtChartColors[index]}
                                            index={index}
                                        />
                                    ))}
                                </div>
                                <div>
                                    <button className="add-debt" onClick={handleAddDebt}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default QuickInfoDebt