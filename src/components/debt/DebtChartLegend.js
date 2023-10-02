import React from "react";

function DebtChartLegend({ description, color, index }) {
    
    return (
        <div className="legend-debt-item">
            <svg className="legend-debt-icon" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" rx="7" ry="7" fill={color} />
            </svg>

            <div className="legend-debt-description"> {description} </div>

        </div>
    )
}

export default DebtChartLegend