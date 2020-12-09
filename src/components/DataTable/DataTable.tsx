import { BindAll } from 'lodash-decorators'
import React from 'react'
import { ContactFromServer } from '../../api/models/contacts'
import { FromServerContactTag, FromServerTag } from '../../api/models/contactTags'

interface DataTableProps {
    contacts: ContactFromServer[]
    contactTags: FromServerContactTag[]
    tags: FromServerTag[]
}

@BindAll()
export class DataTable extends React.Component<DataTableProps> {
    private renderRows(): JSX.Element[] {
        const { contacts } = this.props
        return contacts.map((contact) => {
            const contactTags = this.getTags(contact.contactTags)

            return (
                <tr key={contact.id}>
                    <td>{contact.firstName + ' ' + contact.lastName}</td>
                    <td>{contactTags}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            )
        })
    }

    private getTags(tagIds: string[]): string {
        const { contactTags, tags } = this.props

        // match the contact tag IDs to tag IDs
        const newTagIds = contactTags.filter(contactTag => {
            return tagIds.indexOf(contactTag.id) !== -1;
        }).map(contactTag => {
            return contactTag.tag
        })

        // get the tag names
        const tagNames = tags.filter(tag => {
            return newTagIds.indexOf(tag.id) !== -1;
        }).map(tag => {
            return tag.tag
        })

        return tagNames.join(', ');
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