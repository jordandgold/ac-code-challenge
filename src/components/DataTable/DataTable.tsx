import { BindAll } from 'lodash-decorators'
import React from 'react'
import { ContactFromServer } from '../../api/models/contacts'

interface DataTableProps {
    contacts: ContactFromServer[]
    contactTags: []
}

@BindAll()
export class DataTable extends React.Component<DataTableProps> {
    private renderRows(): JSX.Element[] {
        const { contacts } = this.props
        return contacts.map((contact) => {
            return (
                <tr key={contact.id}>
                    <td>{contact.firstName + ' ' + contact.lastName}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Contact Name</th>
                        <th>Contact Tags</th>
                        <th>Deals</th>
                        <th>Total Value</th>
                        <th>Location</th>
                    </tr>
                </thead>
                {this.renderRows()}
            </table>
        )
    }
}