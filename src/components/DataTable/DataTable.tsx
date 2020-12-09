import { BindAll } from 'lodash-decorators'
import React from 'react'
import { ContactFromServer } from '../../api/models/contacts'
import { FromServerContactTag, FromServerTag } from '../../api/models/contactTags'

interface DataTableProps {
    contacts: ContactFromServer[]
    contactTags: FromServerContactTag[]
    tags: FromServerTag[]
    contactDeals: any[]
    deals: any[]
    geoIps: any[]
}

@BindAll()
export class DataTable extends React.Component<DataTableProps> {
    private renderRows(): JSX.Element[] {
        const { contacts } = this.props

        return contacts.map((contact) => {
            const contactTags = this.getTags(contact.contactTags)
            const contactDeals = this.getDeals(contact.contactDeals)

            return (
                <tr key={contact.id}>
                    <td>{contact.firstName + ' ' + contact.lastName}</td>
                    <td>{contactTags}</td>
                    <td>{contactDeals}</td>
                    {/* Leaving off total value. See comments in ContactsList.tsx */}
                    {/* <td></td> */}
                    <td></td>
                </tr>
            )
        })
    }

    // It appears, based on the tag data and relationship
    // information I am receiving, this data is incomplete.
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

    private getDeals(dealIds: string[]): string {
        const { contactDeals, deals } = this.props

        // match the contact tag IDs to tag IDs
        const newDealIds = contactDeals.filter(contactDeal => {
            return dealIds.indexOf(contactDeal.id) !== -1;
        }).map(contactDeal => {
            return contactDeal.deal
        })

        // get the tag names
        const dealNames = deals.filter(deal => {
            return newDealIds.indexOf(deal.id) !== -1;
        }).map(deal => {
            return deal.title
        })

        return dealNames.join(', ');
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Contact Name</th>
                        <th>Contact Tags</th>
                        <th>Deals</th>
                        {/* I am leaving off total value because I am honestly not sure what data to use for this
                        I saw each contact had a scoreValues property, but every instance had an empty array */}
                        {/* <th>Total Value</th> */}
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
}