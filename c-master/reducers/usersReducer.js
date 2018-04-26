import { UPDATE_USERS } from '../constants/ActionTypes';

const initialState = [
  {
    id: 'something',
    name: 'Meven'
  },
  {
    id: 'something',
    name: 'Ravi'
  }
];

export default (state, action) => {
  switch (action.type) {
    case UPDATE_USERS:
      return action.data;
    default:
      return state ? state : initialState;
  }
};
