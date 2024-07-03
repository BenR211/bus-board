export interface Bus {
    lineName: string
    timeToStation: string
    towards: string
  }


  export interface BusStop {
    stationName: string;
    buses : Bus[]
    stopCode: string;
}

export  interface longlat {
   
    longitude: string;
    latitude : string;
  
}

export  interface stopPoint{
    naptanId : string
    commonName : string
    indicator: string
}

