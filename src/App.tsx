import React from 'react';
import Calendar from './components/Calendar';

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>My Calendar</h1>
      <Calendar />
    </div>
  );
};

export default App;