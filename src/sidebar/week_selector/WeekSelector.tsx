import Week from './Week/Week';
import './WeekSelector.css'

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'Octover',
    'November',
    'December'
];


export default function WeekSelector() {
    let year: number = 2023;
    return (
        <div className="WeekSelector">
            {
                Array.from(Array(12).keys()).map((month, i) => (
                    <div className="month" key={i}>
                        <h3>{MONTHS[month]}</h3>
                        {
                            Array.from(Array(4).keys()).map((week, j) => (
                                <Week weekNumber={j+1} key={j} />
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}