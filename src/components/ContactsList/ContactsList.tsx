import React from 'react'
import { BindAll } from 'lodash-decorators'
import { DataTable } from '../DataTable/DataTable'
import { ContactFromServer } from '../../api/models/contacts'
import { FromServerContactTag, FromServerTag } from '../../api/models/contactTags'

const API_KEY = process.env.REACT_APP_AC_API_KEY || ''

interface ContactsListProps {}

interface ContactsListState {
    contacts: ContactFromServer[]
    tags: FromServerTag[]
    contactTags: FromServerContactTag[]
    contactDeals: any[]
    deals: any[]
    geoIps: []
    isLoading: boolean
    hasError: boolean
    errorMessage: string
}

@BindAll()
export class ContactsList extends React.Component<ContactsListProps, ContactsListState> {
    constructor(props: ContactsListProps) {
        super(props)

        this.state = {
            contacts: [],
            contactTags: [],
            tags: [],
            contactDeals: [],
            deals: [],
            geoIps: [],
            isLoading: false,
            hasError: false,
            errorMessage: '',
        }
    }

    // This method will fetch all of the data from server. I am
    // performing 3 requests sequentially, then using Promise.all
    // to resolve them and store the data in State. This will only
    // be called once when the page loads since 
    private fetchAllData(endpoints: string[]): void {
        this.setState({ isLoading: true })

        const requestHeaders: HeadersInit = new Headers()
        requestHeaders.set('Content-Type', 'application/json')
        requestHeaders.set('Api-Token', API_KEY)

        let requestArray = endpoints.map(url => {
            return fetch('https://cors-anywhere.herokuapp.com/' + url, {
                "method": "GET",
                headers: requestHeaders
            })
            .then(response => {
                return response.json()
            })
        })

        // I decided to use Promise.all because due to the structure of
        // the API, I need to make various requests in order to get all of
        // the data I need to display in the table. There are a lot of linked
        // resources in this API and the requests are returning large amounts
        // of data.
        //
        // So, I have decided it would be best to just obtain everything I need
        // at once, hold the data in state, and then create selector functions
        // too pull the pieces of data I need. This is a good use case to use
        // Redux, but for the sake of time, I am going to hold everything in
        // local state.
        Promise.all(requestArray)
        .then(data => {
            console.log(data)
            this.setState({
                isLoading: false,
                hasError: false,
                contacts: data[0].contacts,
                contactTags: data[0].contactTags,
                tags: data[1].tags,
                contactDeals: data[0].contactDeals,
                deals: data[3].deals,
                geoIps: data[2].geoIps

            })
        })
        .catch(error => {
            this.setState({
                hasError: true,
                errorMessage: error.toString(),
            })
            console.log('error')
        })
    }

    public componentDidMount() {
        // perform fetch
        this.fetchAllData([
            'https://sahmed93846.api-us1.com/api/3/contacts?include=contactTags,contactDeals,geoIps',
            'https://sahmed93846.api-us1.com/api/3/tags',
            'https://sahmed93846.api-us1.com/api/3/geoIps',
            'https://sahmed93846.api-us1.com/api/3/deals',
        ])
    }

    public render() {
        const { isLoading, hasError, errorMessage } = this.state
        return (
            <div>{ hasError ?
                'Error: ' + errorMessage:
                isLoading ?
                'Loading...' :
                <DataTable
                    contacts={this.state.contacts}
                    contactTags={this.state.contactTags}
                    tags={this.state.tags}
                    contactDeals={this.state.contactDeals}
                    deals={this.state.deals}
                    geoIps={this.state.geoIps}
                />
            }</div>
        )
    }
}