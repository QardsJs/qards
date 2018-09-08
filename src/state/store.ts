import {applyMiddleware, createStore as reduxCreateStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';


const SUBSCRIBE_SET_RESULT = 'QARDS/SUBSCRIBE/SET_RESULT';

interface State {
    subscribe: {
        result?: any;
    }
}

const initialState: State = {
    subscribe: {}
};

export function subscribeSetResult(val: any) {
    return {type: SUBSCRIBE_SET_RESULT, val};
}

const reducer = (state: State, action: any) => {
    switch (action.type) {
        case SUBSCRIBE_SET_RESULT:
            return {
                ...state,
                subscribe: action.val,
            };

        default:
            return state;
    }
};

const createStore = () =>
    reduxCreateStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware())
    );
export default createStore;
