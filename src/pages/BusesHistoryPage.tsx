
import React from 'react';
import Carousel from '../Carousel';

const BusesHistory: React.FC = () => {
  return (
    < div className="buses-history-page">
      <h1>History of Buses in London</h1>
      <p>
        Public transport in London has a rich history, with buses playing a significant role. Let's explore some key points:
      </p>
      <ol>
        <li>
          <strong>Origins of TfL and Early Buses</strong>
          <ul>
            <li>1829: Horse-drawn omnibus services began.</li>
            <li>1902: Motor omnibuses replaced horse-drawn ones.</li>
            <li>London General Omnibus Company (LGOC) unified services.</li>
          </ul>
        </li>
        <li>
          <strong>London Buses Today</strong>
          <ul>
            <li>Transport for London (TfL) manages buses.</li>
            <li>Over 19,000 bus stops and 700 bus routes.</li>
            <li>Approximately 8,600 buses in the fleet.</li>
          </ul>
        </li>
        <li>
          <strong>Interesting Facts</strong>
          <ul>
            <li>George Shillibeer introduced the first omnibus in London.</li>
            <li>London buses are iconic symbols of the city.</li>
          </ul>
        </li>
      </ol>
      <p>Feel free to explore more about London's fascinating bus history!</p>
      <br></br>
      <div>
        <Carousel/>
      </div>
    </div>
  );
};

export default BusesHistory;
