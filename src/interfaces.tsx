export interface Bus {
    lineName: string
    timeToStation: string
  }


  export interface BusStop {
   
    stationName: string;
    buses : Bus[]
  
}

export interface PromisaryBusStop {
   
    stationName: string;
    buses : Promise<Bus[]>
  
}

export  interface longlat {
   
    longitude: string;
    latitude : string;
  
}

export  interface stopPoint{
    naptanId : string
    commonName : string
}

