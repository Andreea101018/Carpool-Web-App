
import React, {useState} from 'react';
import './App.css';
import DriverTable from './components/DriverTable';
import WeekSheet from './components/WeekSheet';

const App: React.FC = () => {
  return (
    <div>
      <DriverTable />
      <WeekSheet />
    </div>
  );
};

export default App;
