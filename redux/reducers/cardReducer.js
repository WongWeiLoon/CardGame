import {CARD_PAIRS_VALUE} from '../../constants';

const initialState = {};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CARD_PAIRS_VALUE:
      return {};

    default:
      return state;
  }
};

export default cardReducer;
