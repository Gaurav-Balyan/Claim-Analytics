const navItems = [
  {
    displayName: 'WorkerCompensation',
    iconName: 'recent_actors',
    route: 'url',
    reportId: '12345678',
    datasetId: '1232143134',
    permission: {
      read: true,
      write: true
    }
  },
  {
    displayName: 'General Liability',
    iconName: 'videocam',
    children: [
      {
        displayName: 'General Liability Child',
        iconName: 'group',
        route: 'url',
        reportId: '12345678',
        datasetId: '1232143134',
        permission: {
          read: true,
          write: true
        }
      }
    ]
  },
  {
    displayName: 'Asset',
    iconName: 'movie_filter',
    children: [
      {
        displayName: 'Child Asset',
        iconName: 'group',
        children: [
          {
            displayName: 'Grandchild Asset 1',
            iconName: 'person',
            route: 'url',
            reportId: '12345678',
            datasetId: '1232143134',
            permission: {
              read: true,
              write: true
            }
          },
          {
            displayName: 'Grandchild Asset 2',
            iconName: 'person',
            route: 'url',
            reportId: '12345678',
            datasetId: '1232143134',
            permission: {
              read: true,
              write: true
            }
          }
        ]
      }
    ]
  }
];

export default navItems;
