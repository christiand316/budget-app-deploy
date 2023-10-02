import React from "react";
import * as d3 from "d3";

function ExpensesChart({ budget, budgetUsed, expensesChartColors }) {

    function sortExpensesByValue(arr, key) {
        if (arr.length === 0) return [];

        return arr.sort((a, b) => b[key] - a[key]);
    }

    const sortedExpenses = sortExpensesByValue(budget.monthlyExpense, "amount")
    const monthlyTotal = budgetUsed.oneTimeTransactionTotal + budgetUsed.monthlyExpenseTotal + budgetUsed.debtTotal


    const debtPercent = parseInt(((budgetUsed.debtTotal / monthlyTotal) * 100).toFixed(0))

    function populateBar() {
        let limitedLengthExpenses = sortedExpenses.slice(0, 4)

        let percentages = []

        for (let i = 0; i < 4; i++) {

            let sumPercent = limitedLengthExpenses.reduce((acc, cur) => acc + cur.amount, 0)

            percentages.push(`${parseInt(((sumPercent / monthlyTotal) * 100).toFixed(0)) + debtPercent}%`)

            limitedLengthExpenses.pop()
        }

        return percentages
    }

    if (budget.monthlyExpense.length === 0) {
        const svg = d3.select("#expense-bar-svg")

        svg
            .append('rect')
            .attr('width', '100%')
            .attr('height', '60')
            .attr('rx', '20')
            .attr('ry', '20')
            .style('fill', `${expensesChartColors[6]}`)
        return (
            <>
                <svg className="expense-bar-svg" width="100%" height="60">
                    <defs>
                        <clipPath id="myExpenseClip">
                            <rect width="90%" height="50" rx="20" ry="20" x="5%" y="5" />
                        </clipPath>
                    </defs>

                    <rect width="100%" height="60" rx="20" ry="20" fill={`${expensesChartColors[0]}`} clipPath="url(#myExpenseClip)" />
                    <rect width="90%" height="50" rx="20" ry="20" x="5%" y="5" fillOpacity="0" stroke="#272924" stroke-opacity="1" stroke-width="10px" />
                </svg>
            </>
        )
    }
    if (budget.monthlyExpense.length > 4) {
        const percentages = populateBar()

        const svg = d3.select("#expense-bar-svg")

        svg
            .append('rect')
            .attr('width', '100%')
            .attr('height', '60')
            .attr('rx', '20')
            .attr('ry', '20')
            .style('fill', `${expensesChartColors[6]}`)

        return (
            <>
                <svg className="expense-bar-svg" width="100%" height="60">
                    <defs>
                        <clipPath id="myExpenseClip">
                            <rect width="90%" height="50" rx="20" ry="20" x="5%" y="5" />
                        </clipPath>
                    </defs>

                    <rect width="100%" height="60" rx="20" ry="20" fill={`${expensesChartColors[6]}`} clipPath="url(#myExpenseClip)" />
                    <rect width={percentages[0]} height="60" rx="20" ry="20" fill={`${expensesChartColors[4]}`} clipPath="url(#myExpenseClip)" />
                    <rect width={percentages[1]} height="60" rx="20" ry="20" fill={`${expensesChartColors[3]}`} clipPath="url(#myExpenseClip)" />
                    <rect width={percentages[2]} height="60" rx="20" ry="20" fill={`${expensesChartColors[2]}`} clipPath="url(#myExpenseClip)" />
                    <rect width={percentages[3]} height="60" rx="20" ry="20" fill={`${expensesChartColors[1]}`} clipPath="url(#myExpenseClip)" />


                    <rect width={`${debtPercent}%`} height="60" rx="20" ry="20" fill={`${expensesChartColors[0]}`} clipPath="url(#myExpenseClip)" />
                    <rect width="90%" height="50" rx="20" ry="20" x="5%" y="5" fillOpacity="0" stroke="#272924" stroke-opacity="1" stroke-width="10px" />
                </svg>
            </>
        )
    }
    if (budget.monthlyExpense.length === 1) {
        const percentages = populateBar()

        const svg = d3.select("#expense-bar-svg")

        svg
            .append('rect')
            .attr('width', '100%')
            .attr('height', '60')
            .attr('rx', '20')
            .attr('ry', '20')
            .style('fill', `${expensesChartColors[5]}`)

        return (
            <>
                <svg className="expense-bar-svg" width="100%" height="60">
                    <defs>
                        <clipPath id="myExpenseClip">
                            <rect width="90%" height="50" rx="20" ry="20" x="5%" y="5" />
                        </clipPath>
                    </defs>

                    <rect width="100%" height="60" rx="20" ry="20" fill="#FFF8C7" clipPath="url(#myExpenseClip)" />
                    <rect width={percentages[0] + debtPercent} height="60" rx="20" ry="20" fill={`${expensesChartColors[1]}`} clipPath="url(#myClip)" />

                    <rect width={debtPercent} height="60" rx="20" ry="20" fill={`${expensesChartColors[0]}`} clipPath="url(#myClip)" />
                    <rect width="90%" height="50" rx="20" ry="20" x="5%" y="5" fillOpacity="0" stroke="#272924" stroke-opacity="1" stroke-width="10px" />
                </svg>
            </>
        )
    }
    if (budget.monthlyExpense.length === 2) {
        const percentages = populateBar()

        const svg = d3.select("#expense-bar-svg")

        svg
            .append('rect')
            .attr('width', '100%')
            .attr('height', '60')
            .attr('rx', '20')
            .attr('ry', '20')
            .style('fill', `${expensesChartColors[5]}`)

        return (
            <>
                <svg className="expense-bar-svg" width="100%" height="60">
                    <defs>
                        <clipPath id="myExpenseClip">
                            <rect width="90%" height="50" rx="20" ry="20" x="5%" y="5" />
                        </clipPath>
                    </defs>

                    <rect width="100%" height="60" rx="20" ry="20" fill="#FFF8C7" clipPath="url(#myExpenseClip)" />
                    <rect width={percentages[0]} height="60" rx="20" ry="20" fill={`${expensesChartColors[2]}`} clipPath="url(#myClip)" />
                    <rect width={percentages[1]} height="60" rx="20" ry="20" fill={`${expensesChartColors[1]}`} clipPath="url(#myClip)" />

                    <rect width={`${debtPercent}%`} height="60" rx="20" ry="20" fill={`${expensesChartColors[0]}`} clipPath="url(#myClip)" />
                    <rect width="90%" height="50" rx="20" ry="20" x="5%" y="5" fillOpacity="0" stroke="#272924" stroke-opacity="1" stroke-width="10px" />
                </svg>
            </>
        )
    }
    if (budget.monthlyExpense.length === 3) {
        const percentages = populateBar()

        const svg = d3.select("#expense-bar-svg")

        svg
            .append('rect')
            .attr('width', '100%')
            .attr('height', '60')
            .attr('rx', '20')
            .attr('ry', '20')
            .style('fill', `${expensesChartColors[5]}`)

        return (
            <>
                <svg className="expense-bar-svg" width="100%" height="60">
                    <defs>
                        <clipPath id="myExpenseClip">
                            <rect width="90%" height="50" rx="20" ry="20" x="5%" y="5" />
                        </clipPath>
                    </defs>

                    <rect width="100%" height="60" rx="20" ry="20" fill="#FFF8C7" clipPath="url(#myExpenseClip)" />
                    <rect width={percentages[0]} height="60" rx="20" ry="20" fill={`${expensesChartColors[3]}`} clipPath="url(#myClip)" />
                    <rect width={percentages[1]} height="60" rx="20" ry="20" fill={`${expensesChartColors[2]}`} clipPath="url(#myClip)" />
                    <rect width={percentages[2]} height="60" rx="20" ry="20" fill={`${expensesChartColors[1]}`} clipPath="url(#myClip)" />

                    <rect width={`${debtPercent}%`} height="60" rx="20" ry="20" fill={`${expensesChartColors[0]}`} clipPath="url(#myClip)" />
                    <rect width="90%" height="50" rx="20" ry="20" x="5%" y="5" fillOpacity="0" stroke="#272924" stroke-opacity="1" stroke-width="10px" />
                </svg>
            </>
        )
    }
    if (budget.monthlyExpense.length === 4) {
        const percentages = populateBar()

        const svg = d3.select("#expense-bar-svg")

        svg
            .append('rect')
            .attr('width', '100%')
            .attr('height', '60')
            .attr('rx', '20')
            .attr('ry', '20')
            .style('fill', `${expensesChartColors[5]}`)

        return (
            <>
                <svg className="expense-bar-svg" width="100%" height="60">
                    <defs>
                        <clipPath id="myExpenseClip">
                            <rect width="90%" height="50" rx="20" ry="20" x="5%" y="5" />
                        </clipPath>
                    </defs>

                    <rect width="100%" height="60" rx="20" ry="20" fill="#FFF8C7" clipPath="url(#myExpenseClip)" />
                    <rect width={percentages[0]} height="60" rx="20" ry="20" fill={`${expensesChartColors[4]}`} clipPath="url(#myClip)" />
                    <rect width={percentages[1]} height="60" rx="20" ry="20" fill={`${expensesChartColors[3]}`} clipPath="url(#myClip)" />
                    <rect width={percentages[2]} height="60" rx="20" ry="20" fill={`${expensesChartColors[2]}`} clipPath="url(#myClip)" />
                    <rect width={percentages[3]} height="60" rx="20" ry="20" fill={`${expensesChartColors[1]}`} clipPath="url(#myClip)" />

                    <rect width={`${debtPercent}%`} height="60" rx="20" ry="20" fill={`${expensesChartColors[0]}`} clipPath="url(#myClip)" />
                    <rect width="90%" height="50" rx="20" ry="20" x="5%" y="5" fillOpacity="0" stroke="#272924" stroke-opacity="1" stroke-width="10px" />
                </svg>
            </>
        )
    }
}

export default ExpensesChart