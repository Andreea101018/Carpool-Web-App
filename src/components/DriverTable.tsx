import React from 'react';
import carpools from '../data/carpools.json';
import './styles.css';
import moment from 'moment';


const DriverTable: React.FC = () => {//defines a functional React component using arrow function syntax
    const drivers = ['MR', 'JL', 'AC', 'CJ']; //array with all the drivers 
  
    const getDriverInfo = (driver: string) => { //takes the driver name as an argument.
      const driverEvents = carpools.CarPoolEvents.filter( //
        (event: any) => event.Driver === driver
      );// filters the carpools.CarPoolEvents array to get only the events where the driver's name matches the provided driver
      const tripCount = driverEvents.length;//calculates the number of trips for the driver by getting the length of the driverEvents
      const passengerCount = carpools.CarPoolEvents.filter(
        (event: any) =>
          event.Passengers.some(
            (passenger: any) => passenger.Name === driver
          )
      ).length;//calculates the number of trips the driver has taken as a passenger.

      
      const lastDriveTimestamp = driverEvents[tripCount - 1]?.Timestamp;//retrieves the timestamp of the last drive
      const lastPassengerTimestamp = carpools.CarPoolEvents.filter(
        (event: any) => event.Passengers.some((passenger: any) => passenger.Name === driver)
      )[0]?.Timestamp;//etrieves the timestamp of the last time the driver was a passenger
   
      return {
        tripCount,
        passengerCount,
        lastDriveTimestamp,
        lastPassengerTimestamp,
      };//returns an object with the calculated values
    };
    const getFormattedDate = (timestamp: string) => {
        console.log(timestamp)
        var date = moment(timestamp, "YYYYMMDD").format("MMM Do YYYY");
            
            return date.toString();
            };//convert a timestamp string into a more human-readable date format using the moment library
   
  
    return (
      <div>
        <h2>Driver Table</h2>
        <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Trip Count</th>
              <th>Passenger Count</th>
              <th>Last Drive Timestamp</th>
              <th>Last Passenger Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => {
              const {
                tripCount,
                passengerCount,
                lastDriveTimestamp,
                lastPassengerTimestamp,
              } = getDriverInfo(driver);// uses the map function to iterate over the drivers array. For each driver, it generates a table row (<tr>) and its corresponding cells (<td>) using the data obtained from the getDriverInfo function.
              return (
                <tr key={driver}>//
                  <td>{driver}</td>
                  <td>{tripCount}</td>
                  <td>{passengerCount}</td>
                  <td>{getFormattedDate(lastDriveTimestamp)}</td>
                  <td>{getFormattedDate(lastPassengerTimestamp)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    );
  };
  
  export default DriverTable;