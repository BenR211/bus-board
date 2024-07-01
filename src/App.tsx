import React, {useState} from 'react';

import postCodeToFirst5BusesAt2NearestBusStops from "./ApiCode";

type Props = {
  busStops: JSON[][]
}
type subListProp = {
  buses: JSON[]
}

async function getBuses(postcode: string): Promise<JSON[][]> {
    // very basic testing string, you'll likely return a list of strings or JSON objects instead!
    const arrivingBuses = await postCodeToFirst5BusesAt2NearestBusStops(postcode)
    
    //const postcodeString = (postcode === "") ? "" : ` - given postcode is ${postcode}`;
    return  arrivingBuses;
}
function App(): React.ReactElement {
    const [postcode, setPostcode] = useState<string>("");
    const [tableData, setTableData] = useState<JSON[][]>([[]]);
    
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


interface businfo {
   
    stationName: string;
    lineName : string;
    arrivalTime: string;
  
}

function Buildbuslist (props : Props){
  const listElms = props.busStops.map(busStop => 
    <li ><BuildsubList buses={busStop} /></li>
  )

  return (<ul>
    {listElms}
</ul>)
}

function BuildsubList  (props : subListProp) {
  

  const listElms = props.buses.map(bus =>
    <li>{(bus as any).stationName} </li>
    

  )
  return (
    <ul>{listElms}</ul>
  )
}




export default App;
