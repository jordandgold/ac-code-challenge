import React from 'react'
import { BindAll } from 'lodash-decorators'

const API_KEY = process.env.REACT_APP_AC_API_KEY || ''

interface ContactsListProps {}

interface ContactsListState {
    data: any
    isLoading: boolean
}

@BindAll()
export class ContactsList extends React.Component<ContactsListProps, ContactsListState> {
    constructor(props: ContactsListProps) {
        super(props)

        this.state = {
            data: {},
            isLoading: false,
        }
    }

    private async fetchContacts(): Promise<any> {
        this.setState({ isLoading: true })

        const requestHeaders: HeadersInit = new Headers()
        requestHeaders.set('Content-Type', 'application/json')
        requestHeaders.set('Api-Token', API_KEY)
        // fetch contacts from the API
        return fetch('https://cors-anywhere.herokuapp.com/https://sahmed93846.api-us1.com/api/3/contacts', {
            headers: requestHeaders
        })
    }

    public async componentDidMount() {
        await this.fetchContacts()
        .then(response => {
            return response.json()
        })
        .then(data => {
            this.setState({ data, isLoading: false });
        });
    }

    public render() {
        const { isLoading } = this.state
        return (
            <div>{ isLoading ? 'Loading...' : 'hey'}</div>
        )
    }
}