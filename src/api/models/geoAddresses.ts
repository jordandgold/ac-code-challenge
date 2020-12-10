export interface FromServerGeoAddress {
    area: string
    city: string
    country: string
    country2: string
    id: string
    ip4: string
    lat: string
    links: []
    lon: string
    state: string
    tstamp: string
    tz: string
    zip: string
}

export interface FromServerGeoIp {
    campaignid: string
    contact: string
    geoAddress: string
    geoaddrid: string
    id: string
    ip4: string
    links: {
        geoAddress: string
    }
    messageid: string
    tstamp: string
}