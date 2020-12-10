import { BindAll } from 'lodash-decorators'
import React from 'react'
import { FromServerContact } from '../../api/models/contacts'
import { FromServerContactTag, FromServerTag } from '../../api/models/contactTags'
import { FromServerGeoAddress, FromServerGeoIp } from '../../api/models/geoAddresses'

import './dataTable.scss'

interface DataTableProps {
    contacts: FromServerContact[]
    contactTags: FromServerContactTag[]
    tags: FromServerTag[]
    contactDeals: any[]
    deals: any[]
    geoIps: FromServerGeoIp[]
    geoAddresses: FromServerGeoAddress[]
}

@BindAll()
export class DataTable extends React.Component<DataTableProps> {
    render() {
        return (
            <table className="ac-data-table">
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

    private renderRows(): JSX.Element[] {
        const { contacts } = this.props

        return contacts.map((contact) => {
            const contactTags = this.getTags(contact.contactTags).join(', ');

            // see comment about deals below
            // const contactDeals = this.getDeals(contact.contactDeals).join(', ');

            const location = this.getLocation(contact.geoIps).join(', ');

            return (
                <tr key={contact.id}>
                    <td><a href="#">{contact.firstName + ' ' + contact.lastName}</a></td>
                    <td>{contactTags}</td>
                    <td align="center">{contact.contactDeals.length}</td>
                    {/* Leaving off total value. See comments in ContactsList.tsx */}
                    {/* <td></td> */}
                    <td>{location}</td>
                </tr>
            )
        })
    }

    // It appears, based on the tag data and relationship
    // information I am receiving, this data is incomplete.
    private getTags(tagIds: string[]): string[] {
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

        return tagNames
    }

    // Originally I thought we wanted the deal names. This block
    // is no longer needed. I saw in the design system that the
    // deal is just a number

    // private getDeals(dealIds: string[]): string[] {
    //     const { contactDeals, deals } = this.props

    //     // match the contact tag IDs to tag IDs
    //     const newDealIds = contactDeals.filter(contactDeal => {
    //         return dealIds.indexOf(contactDeal.id) !== -1
    //     }).map(contactDeal => {
    //         return contactDeal.deal
    //     })

    //     // get the tag names
    //     const dealNames = deals.filter(deal => {
    //         return newDealIds.indexOf(deal.id) !== -1
    //     }).map(deal => {
    //         return deal.title
    //     })

    //     return dealNames
    // }

    private getLocation(geoIpsFromContact: string[]): string[] {
        const { geoIps, geoAddresses } = this.props

        // match the contact tag IDs to tag IDs
        const newGeoIds = geoIps.filter(geoIp => {
            return geoIpsFromContact.indexOf(geoIp.id) !== -1
        }).map(geoIp => {
            return geoIp.geoAddress
        })

        // assuming a contact can have multiple locations
        // since contact.geoIps is an array (and plural)
        const locations = geoAddresses.filter(geoAddress => {
            return newGeoIds.indexOf(geoAddress.id) !== -1
        })

        const serializedLocations = locations.map(locationData => {
            return `${locationData.city}, ${locationData.state}, ${locationData.country}`
        })

        return serializedLocations
    }
}