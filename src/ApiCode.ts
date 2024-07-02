import {Bus,longlat,stopPoint,BusStop,PromisaryBusStop} from "./interfaces";


function sleep(ms: number) {
    return new Promise (resolve => setTimeout(resolve,ms));
}

async function getStopIDToFirst5Buses(stopID : string): Promise<Bus[]> {
    const  myUrl : string = `https://api.tfl.gov.uk/StopPoint/${stopID}/Arrivals`;
    const response = await fetch(myUrl);
    const buses = await response.json();
    await sleep(10000)
    return buses.slice(0, 5)


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
    

    let busStopInfo: BusStop[]= await Promise.all(busStops.map(async (busStop) => {
        const buses = await getStopIDToFirst5Buses(busStop.naptanId);
        return { stationName: busStop.commonName, buses }
    }));
    
    //for (let i = 0; i < busStops.length; i++) {
    //    let temp = await getStopIDToFirst5Buses(busStops[i].naptanId)
    //    busStopInfo.push({stationName: busStops[i].commonName, buses: temp})
   // }
    return busStopInfo
}

export default getPostCodeToFirst5BusesAt2NearestBusStops