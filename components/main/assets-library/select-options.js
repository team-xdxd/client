export default {
  sort: [
    {
      label: 'None',
      value: 'none'
    },
    {
      label: 'Newest',
      value: 'newest',
      field: 'createdAt',
      order: 'desc'
    },
    {
      label: 'Oldest',
      value: 'oldest',
      field: 'createdAt',
      order: 'asc'
    },
    {
      label: 'Alphabetical',
      value: 'alphabetical',
      field: 'name',
      order: 'asc'
    },
    {
      label: 'File Size',
      value: 'size',
      field: 'size',
      order: 'desc'
    }
  ],

  views: [
    {
      text: 'Folders',
      name: 'folders',
      ommitFolder: true
    },
    {
      text: 'All',
      name: 'all'
    },
    {
      text: 'Images',
      name: 'images'
    },
    {
      text: 'Videos',
      name: 'videos'
    },
    {
      text: 'Archived',
      name: 'archived',
      ommitFolder: true
    }
  ]
}