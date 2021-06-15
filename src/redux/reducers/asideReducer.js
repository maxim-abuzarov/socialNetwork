let initialState = {
    friendsData: [
        {id: 1, name: 'Maxim', url: 'https://z0sqrs-a.akamaihd.net/1647-easthillmedical/staff/he.jpg'},
        {id: 2, name: 'Oleg', url: 'https://z0sqrs-a.akamaihd.net/1647-easthillmedical/staff/he.jpg'},
        {id: 3, name: 'Yury', url: 'https://z0sqrs-a.akamaihd.net/1647-easthillmedical/staff/he.jpg'},
    ],
}

const asideReducer = (state = initialState, action) => {
    return state;
}

export default asideReducer;
