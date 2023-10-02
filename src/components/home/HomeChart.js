import React from "react";
import * as d3 from "d3";

function HomeChart({ budget, budgetUsed }) {

    const svg = d3.select("#bar-svg")

    svg
        .append('rect')
        .attr('width', '100%')
        .attr('height', '60')
        .attr('rx', '20')
        .attr('ry', '20')
        .style('fill', '#FFF8C7')



    // Purchases 
    let purchasesPercent = `${(((budgetUsed.oneTimeTransactionTotal + budgetUsed.monthlyExpenseTotal + budgetUsed.debtTotal) / budget.budgetAmount) * 100).toFixed(0)}%`
   
    svg
        .append('rect')
        .attr('width', `${purchasesPercent}%`)
        .attr('height', '60')
        .attr('rx', '20')
        .attr('ry', '20')
        .style('fill', '#F06449')


    // Monthly Expenses
    let expensesPercent = `${(((budgetUsed.monthlyExpenseTotal + budgetUsed.debtTotal) / budget.budgetAmount) * 100).toFixed(0)}%`
    svg
        .append('rect')
        .attr('width', `${expensesPercent}%`)
        .attr('height', '60')
        .attr('rx', '20')
        .attr('ry', '20')
        .style('fill', '#5F5F5F')



    // debt
    let debtPercent = `${((budgetUsed.debtTotal / budget.budgetAmount) * 100).toFixed(0)}%`

    svg
        .append('rect')
        .attr('width', `${debtPercent}%`)
        .attr('height', '60')
        .attr('rx', '20')
        .attr('ry', '20')
        .style('fill', '#0E1212')

    // stroke along outside to prevent 1px clipping



    svg
        .append('rect')
        .attr('width', '100%')
        .attr('height', '60')
        .attr('rx', '20')
        .attr('ry', '20')
        .attr('stroke', "#272924")
        .attr('stroke-opacity', "1")
        .attr('stroke-width', '10px')
        .attr('fill-opacity', '0')
        .attr('clipPath', "url(#graph-clip-mask)")
    svg


    return (
        <>
            <svg className="quickinfo-bar-svg" width="100%" height="60">
                <defs>
                    <clipPath id="myClip">
                        <rect width="90%" height="50" rx="20" ry="20" x="5%" y="5" />
                    </clipPath>
                </defs>

                <rect width="100%" height="60" rx="20" ry="20" fill="#FFF8C7" clipPath="url(#myClip)" />
                <rect width={purchasesPercent} height="60" rx="20" ry="20" fill="#F06449" clipPath="url(#myClip)" />
                <rect width={expensesPercent} height="60" rx="20" ry="20" fill="#5F5F5F" clipPath="url(#myClip)" />
                <rect width={debtPercent} height="60" rx="20" ry="20" fill="#0E1212" clipPath="url(#myClip)" />
                <rect width="90%" height="50" rx="20" ry="20" x="5%" y="5" fillOpacity="0" stroke="#272924" stroke-opacity="1" stroke-width="10px" />
            </svg>
        </>
    )
}

export default HomeChart
//<svg className="bar-svg" id="bar-svg" clipPath="url(#myClip)" />