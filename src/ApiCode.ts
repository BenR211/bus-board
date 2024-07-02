async function getStopIDToFirst5Buses(stopID : string): Promise<Bus[]> {
    const  myUrl : string = `https://api.tfl.gov.uk/StopPoint/${stopID}/Arrivals`;
    const response = await fetch(myUrl);
    const buses = await response.json();
    return buses.slice(0, 5)


  }

  export interface Bus {
    lineName: string
    timeToStation: string
  }


  export interface BusStop {
   
    stationName: string;
    buses : Bus[]
  
}

export interface longlat {
   
    longitude: string;
    latitude : string;
  
}

interface stopPoint{
    naptanId : string
    commonName : string
}

async function getPostCodeToLongLat(postcode : string) : Promise<longlat>  {
    const myUrl : string = `https://api.postcodes.io/postcodes/${postcode}`;
    const response = await fetch(myUrl);
    const data = await response.json();
    return {longitude: data.result.longitude , latitude: data.result.latitude};
}

async function getLongLatToBusStopIds(longLat : longlat) : Promise<stopPoint[]> {
    const  myUrl : string = `https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&lat=${longLat.latitude}&lon=${longLat.longitude}`;
    const response = await fetch(myUrl);
    
    const { stopPoints } = await response.json();
    console.log(stopPoints)
    
    const busStopInfo = stopPoints.slice(0, 2).map((stopPoint: stopPoint) => ({ naptanId: stopPoint.naptanId, commonName : stopPoint.commonName  }));
    
    return busStopInfo

}

async function  getPostCodeToFirst5BusesAt2NearestBusStops(postcode : string): Promise<BusStop[]> {
    const longLat = await getPostCodeToLongLat(postcode)
    const busStops: stopPoint[] = await getLongLatToBusStopIds(longLat)
    

    let busStopInfo: BusStop[] = []
    
    for (let i = 0; i < busStops.length; i++) {
        let temp = await getStopIDToFirst5Buses(busStops[i].naptanId)
        busStopInfo.push({stationName: busStops[i].commonName, buses: temp})
    }
    return busStopInfo
}

export default getPostCodeToFirst5BusesAt2NearestBusStops