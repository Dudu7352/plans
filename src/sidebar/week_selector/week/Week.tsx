import { MONTHS } from '../../../consts';
import Day from './day/Day';
import './Week.css';

interface WeekProps {
  weekId: number,
  slice: number[],
  monthDay: number,
  monthChange: number,
  month: number,
  setWeek: () => void
}

export default function Week(props: WeekProps) {
   return (
    <div className="Column" onClick={props.setWeek}>
        <h3>
        {
          props.monthDay+6 >= props.monthChange ?
          MONTHS[props.month].slice(0, 3) : ""
        }
        </h3>
        <div className="Week selector">
        {
          [...Array(7)].map((_, i) => {
            let day: number = props.monthDay + i;
            if(props.monthChange !== 0)
              day = props.weekId === 0 ? day-props.monthChange : day%props.monthChange

            return (
              <Day 
                key={props.weekId*7 + i + 1}
                monthDay = {
                  props.slice[0] <= i && i < props.slice[1] ?
                  day+1 : -1
                }
              /> 
            );
          })
        }
      </div>
    </div>
  );
}
