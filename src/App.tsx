import React, {useEffect, useState} from 'react';
import getPostCodeToFirst5BusesAt2NearestBusStops, { BusStop } from "./ApiCode";
import { table } from 'console';



type Props = {
  busStops: BusStop[]
}
type subListProp = {
  busStop: BusStop
}

async function getBuses(postcode: string): Promise<BusStop[]> {
    // very basic testing string, you'll likely return a list of strings or JSON objects instead!
    const arrivingBuses = await getPostCodeToFirst5BusesAt2NearestBusStops(postcode)
    
    //const postcodeString = (postcode === "") ? "" : ` - given postcode is ${postcode}`;
    return  arrivingBuses;
}
function App(): React.ReactElement {
    const [postcode, setPostcode] = useState<string>("");
    const [tableData, setTableData] = useState<BusStop[]>([]);
    
    async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault(); // to stop the form refreshing the page when it submits
        fetchBusData()
    }

    function updatePostcode(data: React.ChangeEvent<HTMLInputElement>): void {
        setPostcode(data.target.value)
    }
    async function fetchBusData() {
      let busData = await getBuses(postcode)
      setTableData(busData)
    }

    useEffect(() => {
      let timerId = setInterval(() => {
        if (tableData) fetchBusData();
      }, 30000);
      return () => {
        clearInterval(timerId)
      }
    }, [tableData])
    
   
    return ( <>
      <div className="bus-board-page">
        <h1> BusBoard </h1>
        <form action="" onSubmit={formHandler}>
            <label htmlFor="postcodeInput"> Postcode: </label>
            <input type="text" id="postcodeInput" onChange={updatePostcode}/>
            <input type="submit" value="Submit"/>
        </form>
       
        <BuildBusList busStops={tableData} />
      </div>
    </>);
}





function BuildBusList (props : Props){
  const listElms = props.busStops.map(busStop => 
    <li key={busStop.stationName} className="bus-stop"><h2>{busStop.stationName}</h2> <BuildSubList busStop={busStop} /></li>
  )

  return (<ul className="bus-board">
    {listElms}
  </ul>)
}

function BuildSubList  (props : subListProp) {
  props.busStop.buses.sort((a, b) => a.timeToStation > b.timeToStation ? 1 : -1)
  const listElms = props.busStop.buses.map(bus =>
    <li>{bus.lineName + " in " + Math.trunc(parseInt(bus.timeToStation) / 60) + " mins"} </li>
    )
  return (
    <ul className="bus-list">{listElms}</ul>
  )
}




export default App;
