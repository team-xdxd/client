import { capitalCase } from 'change-case'

export const getAssociatedCampaigns = (asset) => {
    const campaigns = {}
    const { projects, tasks } = asset

    if (projects)
        projects.forEach(project => {
            const { campaign } = project
            if (campaign) {
                campaigns[campaign.id] = campaign.name
            }
        })

    if (tasks)
        tasks.forEach(task => {
            const { project } = task
            if (project) {
                const { campaign } = project
                if (campaign) {
                    campaigns[campaign.id] = campaign.name
                }
            }
        })

    const entries = Object.entries(campaigns)

    if (entries.length > 0)
        return entries.map(([_, name]) => name).join(', ')

    else
        return 'No Campaigns'
}

export const getAssociatedChannels = (asset) => {
    const channels = {}
    const { projects, tasks } = asset

    if (projects)
        projects.forEach(project => {
            const { type } = project
            channels[type] = capitalCase(type)
        })

    if (tasks)
        tasks.forEach(task => {
            const { project } = task
            if (project) {
                const { type } = project
                channels[type] = capitalCase(type)
            }
        })

    const entries = Object.entries(channels)

    if (entries.length > 0)
        return entries.map(([_, name]) => name).join(', ')

    else
        return 'No Channels'
}

export const getParsedExtension = (extension) => {
    switch (extension) {
        case 'msword':
            return 'doc'
        case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'doc'
        case 'vnd.ms-powerpoint':
            return 'ppt'
        case 'vnd.openxmlformats-officedocument.presentationml.presentation':
            return 'ppt'
        case 'vnd.ms-excel':
            return '.xlsx'
        case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return '.xlsx'
        default:
            return extension
    }
}