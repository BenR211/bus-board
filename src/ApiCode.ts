async function stopIDToFirst5Buses(stopID : string): Promise<Bus[]> {
    const  myUrl : string = "https://api.tfl.gov.uk/StopPoint/" + stopID + "/Arrivals";
    const response = await fetch(myUrl);
    const data = await response.json();
    // deal with JSON response
    const busesArray = []
    const numOfBuses = Math.min(5, data.length)
    for (let i = 0 ; i < numOfBuses;  i ++){
        busesArray.push({lineName : data[i].lineName, timeToStation: data[i].timeToStation})
    }
    return busesArray


  }

  export interface Bus {
    lineName: string
    timeToStation: string
  }


  export interface BusStop {
   
    stationName: string;
    buses : Bus[]
  
}

async function postCodeToLongLat(postcode : string) : Promise<string[]>  {
    const myUrl : string = "https://api.postcodes.io/postcodes/" + postcode ;
    const response = await fetch(myUrl);
    const data = await response.json();
    return [data.result.longitude , data.result.latitude];
}

async function longLatToBusStopIds(longLat : string[]) : Promise<string[][]> {
    const  myUrl : string = "https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&lat=" + longLat[1] + "&lon=" + longLat[0];
    const response = await fetch(myUrl);
    const data = await response.json();
    // deal with JSON response
    const busIds = []
    const busStopNames = []
    const numOfStops = Math.min(2, data.stopPoints.length)
    for (let i = 0 ; i < numOfStops;  i ++){
        busIds.push(data.stopPoints[i].naptanId);
        busStopNames.push(data.stopPoints[i].commonName + " (" + data.stopPoints[i].indicator + ")")
    }
    return [busIds, busStopNames]
}

async function  postCodeToFirst5BusesAt2NearestBusStops(postcode : string): Promise<BusStop[]> {
    const longLat = await postCodeToLongLat(postcode)
    const busStops: string[][] = await longLatToBusStopIds(longLat)
    const busStopIds = busStops[0]
    const busStopNames = busStops[1]
    let busStopInfo: BusStop[] = []
    
    for (let i = 0; i < busStopIds.length; i++) {
        let temp = await stopIDToFirst5Buses(busStopIds[i])
        busStopInfo.push({stationName: busStopNames[i], buses: temp})
    }
    return busStopInfo
}

export default postCodeToFirst5BusesAt2NearestBusStops