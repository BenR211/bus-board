async function stopIDToFirst5Buses(stopID : string): Promise<JSON[]> {
    const  myUrl : string = "https://api.tfl.gov.uk/StopPoint/" + stopID + "/Arrivals";
    const response = await fetch(myUrl);
    const data = await response.json();
    // deal with JSON response
    const busesArray = []
    const numOfBuses = Math.min(5, data.length)
    for (let i = 0 ; i < numOfBuses;  i ++){
        busesArray.push(data[i])
    }
    return busesArray


  }

async function postCodeToLongLat(postcode : string) : Promise<string[]>  {
    const myUrl : string = "https://api.postcodes.io/postcodes/" + postcode ;
    const response = await fetch(myUrl);
    const data = await response.json();
    return [data.result.longitude , data.result.latitude];
}

async function longLatToBusStopIds(longLat : string[]) : Promise<string[]> {
    const  myUrl : string = "https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&lat=" + longLat[1] + "&lon=" + longLat[0];
    const response = await fetch(myUrl);
    const data = await response.json();
    // deal with JSON response
    const busIds = []
    const numOfStops = Math.min(2, data.stopPoints.length)
    for (let i = 0 ; i < numOfStops;  i ++){
        busIds.push(data.stopPoints[i].naptanId);
    }
    return busIds
}

async function  postCodeToFirst5BusesAt2NearestBusStops(postcode : string): Promise<JSON[][]> {
    const longLat = await postCodeToLongLat(postcode)
    const busStopIds: string[] = await longLatToBusStopIds(longLat)
    let buses: JSON[][] = []
    
    for (let i = 0; i < busStopIds.length; i++) {
        let temp = await stopIDToFirst5Buses(busStopIds[i])
        buses.push(temp)
    }
    return buses
}

export default postCodeToFirst5BusesAt2NearestBusStops