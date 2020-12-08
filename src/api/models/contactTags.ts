export interface FromServerContactTag {
    cdate: string
    contact: string
    created_by: string
    created_timestamp: string
    id: string
    links: {
        tag: string
        contact: string
    }
    tag: string
    updated_by: string
    updated_timestamp: string
}

export interface FromServerTag {
    tagType: string
    tag: string
    description: string
    cdate: string
    links: {
        contactGoalTags: string
    },
    id: string
}