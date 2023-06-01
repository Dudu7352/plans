import React from "react";

interface weekProps {
    weekNumber: number;
}

export default function Week(props: weekProps) {
    return (
        <div className="Week selector">
            <p>Week {props.weekNumber}</p>
        </div>
    );
}