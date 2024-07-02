type Props = {
    busStops: BusStop[]
  }
  type subListProp = {
    busStop: BusStop
  }

  export interface Bus {
    lineName: string
    timeToStation: string
  }


  export interface BusStop {
   
    stationName: string;
    buses : Bus[]
  
}