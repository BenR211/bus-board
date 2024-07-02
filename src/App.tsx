import React, {useState} from 'react';
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
          const data = await getBuses(postcode); 
          setTableData(data);
        } else {
          alert("invalid postcode")
        }
    }
    function updatePostcode(data: React.ChangeEvent<HTMLInputElement>): void {
        setPostcode(data.target.value)
    }
    
   
    return ( <>
        <h1> BusBoard </h1>
        <form action="" onSubmit={formHandler}>
            <label htmlFor="postcodeInput"> Postcode: </label>
            <input type="text" id="postcodeInput" onChange={updatePostcode}/>
            <input type="submit" value="Submit"/>
        </form>
       
        <BuildOuterBusStopList busStops={tableData} />
    </>);
}

function LoadingBar() {
  
}





function BuildOuterBusStopList (props : Props){
  const listElms = props.busStops.map(busStop => 
    <li key={busStop.stationName}><div>{busStop.stationName}</div> <BuildsubList busStop={busStop} /></li>
  )

  return (<ul>
    {listElms}
</ul>)
}

function BuildsubList  (props : subListProp) {
  props.busStop.buses.sort((a, b) => a.timeToStation > b.timeToStation ? 1 : -1)
  const listElms = props.busStop.buses.map(bus =>
    <li>{bus.lineName + " in " + Math.trunc(parseInt(bus.timeToStation) / 60) + " mins"} </li>
    )
  return (
    <ul>{listElms}</ul>
  )
}




export default App;
