export const getAssociatedCampaigns = (asset) => {
    const campaigns = {}
    asset.projects.forEach(project => {
        const { campaign } = project
        if (campaign) {
            campaigns[campaign.id] = campaign.name
        }
    })

    asset.tasks.forEach(task => {
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
        return 'No Campaign'
}