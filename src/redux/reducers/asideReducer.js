import avatar from './../../assets/img/unknownUser.jpeg';

let initialState = {
    friendsData: [
        {id: 1, name: 'Maxim', url: avatar},
        {id: 2, name: 'Oleg', url: avatar},
        {id: 3, name: 'Yury', url: avatar},
    ],
}

const asideReducer = (state = initialState) => {
    return state;
}

export default asideReducer;
