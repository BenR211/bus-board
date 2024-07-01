import React, {useState} from 'react';

import postCodeToFirst5BusesAt2NearestBusStops, { BusStop } from "./ApiCode";

type Props = {
  busStops: BusStop[]
}
type subListProp = {
  busStop: BusStop
}

async function getBuses(postcode: string): Promise<BusStop[]> {
    // very basic testing string, you'll likely return a list of strings or JSON objects instead!
    const arrivingBuses = await postCodeToFirst5BusesAt2NearestBusStops(postcode)
    
    //const postcodeString = (postcode === "") ? "" : ` - given postcode is ${postcode}`;
    return  arrivingBuses;
}
function App(): React.ReactElement {
    const [postcode, setPostcode] = useState<string>("");
    const [tableData, setTableData] = useState<BusStop[]>([]);
    
    async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault(); // to stop the form refreshing the page when it submits
        const data = await getBuses(postcode);

        setTableData(data);
    }
    function updatePostcode(data: React.ChangeEvent<HTMLInputElement>): void {
        setPostcode(data.target.value)
    }
    
   
    return <>
        <h1> BusBoard </h1>
        <form action="" onSubmit={formHandler}>
            <label htmlFor="postcodeInput"> Postcode: </label>
            <input type="text" id="postcodeInput" onChange={updatePostcode}/>
            <input type="submit" value="Submit"/>
        </form>
        <ul></ul>
       
        <Buildbuslist busStops={tableData} />
    </>;
}




function Buildbuslist (props : Props){
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
