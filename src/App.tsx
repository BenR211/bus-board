import React, {useState, useEffect} from 'react';
import getPostCodeToFirst5BusesAt2NearestBusStops from "./ApiCode";
import {BusStop} from "./interfaces";


type Props = {
  busStops: BusStop[]
}


type subListProp = {
  busStop: BusStop
}

function postcodeValidator(postcode: string): Boolean {
  const codes = postcode.split(" ")
  if (codes.length !== 2) {
    return false
  } else {
    if (codes[0].length < 2 || codes[0].length > 4 || !(/^[a-zA-Z]/.test(codes[0][0])) || !(/^[a-zA-Z0-9]/.test(codes[0]))) {
      return false
    }
    if (codes[1].length !== 3 || !(/^[0-9]/.test(codes[1][0]))) {
      return false
    }
  }
  return true
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
        if (postcodeValidator(postcode)) {
          fetchBusData()
        } else {
          alert("invalid postcode")
        }
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
        if (postcode && tableData) fetchBusData();
      }, 30000);
      return () => {
        clearInterval(timerId)
      }
    }, [tableData])
    
   
    return (
      <div className="bus-board-page">
        <h1> BusBoard </h1>
        <form action="" onSubmit={formHandler}>
            <label htmlFor="postcodeInput"> Postcode: </label>
            <input type="text" id="postcodeInput" onChange={updatePostcode}/>
            <input type="submit" value="Submit"/>
        </form>
       
        <BuildOuterBusStopList busStops={tableData} />
     </div>);
}





function BuildOuterBusStopList (props : Props){
  const listElms = props.busStops.map(busStop => 
    <li key={busStop.stationName} className="bus-stop"><h2>{busStop.stationName + ` (${busStop.stopCode})` }</h2> <BuildSubList busStop={busStop} /></li>
  )

  return (<ul className="bus-board">
    {listElms}
  </ul>)
}

function BuildSubList  (props : subListProp) {
  props.busStop.buses.sort((a, b) => a.timeToStation > b.timeToStation ? 1 : -1)
  const listElms = props.busStop.buses.map(bus =>
    <li className="bus"><div>{bus.lineName + " " + bus.towards }</div><div>{ Math.trunc(parseInt(bus.timeToStation) / 60) + " mins"} </div></li>
    )
  return (
    <ul className="bus-list">{listElms}</ul>
  )
}




export default App;
