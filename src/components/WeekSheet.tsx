import React, { useState } from 'react';
import carpools from '../data/carpools.json';
import './styles.css';
import moment from 'moment'; //library




const WeekSheet: React.FC = () => { //defines a functional React component using arrow function syntax
    const [currentWeek, setCurrentWeek] = useState(1); //declares a state variable currentWeek and the function setCurrentWeek to update its value. It initializes the state variable with a default value of 1 using the useState hook.
    const [currentMonth, setCurrentMonth] = useState(0);
    const [currentYear, setCurrentYear] = useState(2021);

    const [weekly, setWeekly] = useState(true);
  
    const getWeekEvents = () => { //retrieves the events for the selected week

    const startDate = moment().year(currentYear).isoWeek(currentWeek).startOf('isoWeek'); //calculates the start date of the selected week
    // const endDate = moment().year(currentYear).isoWeek(currentWeek).endOf('isoWeek'); 
  
    const weekEvents = carpools.CarPoolEvents.filter((event: any) => { //filters the carpools.CarPoolEvents array to retrieve the events that fall within the selected week
        const eventDate = moment(event.Timestamp, "YYYYMMDD"); //parse the event's timestamp and create a moment object representing the date
        return eventDate.isSame(startDate, 'week'); //returns boolean value
      });
    
      return weekEvents;
    };

    const getMonthEvents = () => {//retrieves the events for the selected month

        const startDate = moment().year(currentYear).month(currentMonth).startOf('month'); //start date of the selected month
        // const endDate = moment().year(currentYear).month(currentMonth).endOf('month'); 
      
        const monthEvents = carpools.CarPoolEvents.filter((event: any) => {//filters the carpools.CarPoolEvents array to retrieve the events that fall within the selected month
            const eventDate = moment(event.Timestamp, "YYYYMMDD");
            return eventDate.isSame(startDate, 'month');
          });
        
          console.log(monthEvents)
          return monthEvents;
        };

    const getEvents = () => { //responsible for determining which events to retrieve based on the selected view (weekly or monthly)
        if (weekly) { // checks if the selected view is weekly
              // Weekly events
              return getWeekEvents();
        } else {
              // Monthly events
              return getMonthEvents();
        }
          };

  
    const handlePreviousWeek = () => {
        if (currentWeek > 1) {
            setCurrentWeek((prevWeek) => prevWeek - 1);// update the value of currentWeek
            setWeekly(true); //indicates that the selected view is weekly
          }
    };
  
    const handleNextWeek = () => {
        if (currentWeek < 53)//max 53 weeks in a year
        {
      setCurrentWeek((prevWeek) => prevWeek + 1); // update the value of currentWeek
      setWeekly(true);
        }
    };
  
    const handlePreviousMonth = () => {
        if (currentMonth > 0) //ensures that the user doesn't navigate to a month before January.
        {
      setCurrentMonth((prevMonth) => prevMonth - 1);
      setCurrentWeek(1);
      setWeekly(false);
        }
    };
  
    const handleNextMonth = () => {
        if (currentMonth < 11)
        {
      setCurrentMonth((prevMonth) => prevMonth + 1);
      setCurrentWeek(1);
      setWeekly(false);
        }
    };

    const switchOverview = () => { //switch between the two views
        if (weekly) {
          setWeekly(false);
          if (currentWeek == 1)
          {
            setCurrentMonth(0);
          }
          else
          {
          setCurrentMonth(moment().year(currentYear).week(currentWeek).month());
          }
        } else {
          setWeekly(true);
          setCurrentWeek(moment().year(currentYear).month(currentMonth).startOf('month').week());
        }
      };
      
  
    const getFormattedDate = (timestamp: string) => { //takes a timestamp as input and returns a formatted date string
console.log(timestamp)
var date = moment(timestamp, "YYYYMMDD").format("MMM Do YYYY");
    
    return date.toString();
    };

// const getWeekNumber = (timestamp: string) => {
//     var date = moment(timestamp, "YYYYMMDD");
//     var weekNumber = date.week();
      
//     return weekNumber.toString
//       };
  
    return (
      <div>
        <h2>{weekly? 'Overview for 2021: Week ' + currentWeek : 'Overview for 2021: ' + new Date(new Date().getFullYear(), currentMonth, 1).toLocaleString('default', { month: 'long' })}</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        
          <button onClick={switchOverview}>{weekly? 'Month overview' : 'Week overview'}</button>
          <button onClick={weekly? handlePreviousWeek : handlePreviousMonth}>{weekly? 'Previous Week' : 'Previous Month'}</button>
          <button onClick={weekly? handleNextWeek : handleNextMonth}>{weekly? 'Next Week' : 'Next Month'}</button>
        </div>
        <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Passengers</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {getEvents().map((event: any, index: number) => (
              <tr key={index}>
                <td>{event.Driver}</td>
                <td>
                  {event.Passengers.map((passenger: any, index: number) => (
                    <span key={index}>
                      {passenger.Name}
                      {passenger.Roundtrip ? " (Roundtrip)" : ""}
                      {index !== event.Passengers.length - 1 && ", "}
                    </span>
                  ))}
                </td>
                <td>{getFormattedDate(event.Timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    );
  };

  
  
  export default WeekSheet;