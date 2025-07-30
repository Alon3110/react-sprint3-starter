export const demoData = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            title: '1st render',
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        createdAt: 1112223,
        type: 'NoteTxt',
        isPinned: false,
        info: {
            title: 'Bobi and Me',
            url: 'http://some-img/me',
        },
        style: {
            backgroundColor: '#00d'
        }
    },
    {
        id: 'n103',
        createdAt: 1112224,
        type: 'NoteTxt',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            txt: '3rd note',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 },
            ]
        }
    }
]