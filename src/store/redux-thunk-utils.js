// Promise (비동기 방식) 기반 Thunk를 만들어주는 함수
export const createPromiseThunk = (type, promiseCreationFunction) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (
        (params) => {
            return async ( dispatch ) => {
                try{
                    // request
                    // dispatch({ type, params });
                    const payload = await promiseCreationFunction(params);
                    // success
                    dispatch({ type: SUCCESS, payload: payload, error: false });
                } catch (e) {
                    // failure
                    dispatch({ type: ERROR, payload: e, error: true });
                }
            }
        }
    )
}

// Reducer에서 활용할 수 있는 유틸 함수들
export const reducerUtils = {

    initial: (initialData=null)=>({
        loading: false,
        data: initialData,
        error: null
    }),

    loading: (prevState=null)=>({
        loading: true,
        data: prevState,
        error: null
    }),

    success: payload => ({
        loading: false,
        data: payload,
        error: null
    }),

    error: error => ({
        loading: false,
        data: null,
        error: error
    })
}

// 비동기 관련 엑션들 처리를 위한 Reducer를 만들어줌
// type: action type, key: 상태 key (예, posts, post)
export const handleAsyncActions = (type, key, keepData=false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return (state, action) => {
        switch (action.type) {
            // case type:
            //     return {
            //         ...state,
            //     }
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtils.success(action.payload)
                }
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtils.error(action.payload)
                }
            default:
                return state;
        }
    }
}

// 특정 id를 처리하는 thunk 생성함수
const defaultIdSelector = param => param;
export const createPromiseThunkById = (type, promiseCreationFunction, idSelector=defaultIdSelector) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return ( params ) => async (dispatch) => {
        const id = idSelector(params);
        dispatch({ type, meta: id });
        try {
            const payload = await promiseCreationFunction(params);
            dispatch({ type: SUCCESS, payload: payload, meta: id});
        } catch (e) {
            dispatch({ type: ERROR, payload: e, error: true, meta: id })
        }
    }
}

// id별로 처리하는 유틸함수
export const handleAsyncActionsById = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return (state, action) => {
        const id = action.meta;
        switch (action.type) {
        case type:
            return {
                ...state,
                [key]: {
                    ...state[key],
                    [id]: reducerUtils.loading (
                        // state[key][id]가 만들어져있지 않을 수도 있으니까 유효성을 먼저 검사 후 data 조회
                        keepData ? state[key][id] && state[key][id].data : null
                    )
                }
            };
        case SUCCESS:
            return {
                ...state,
                [key]: {
                    ...state[key],
                    [id]: reducerUtils.success(action.payload)
                }
            };
        case ERROR:
            return {
                ...state,
                [key]: {
                    ...state[key],
                    [id]: reducerUtils.error(action.payload)
                }
            };
        default:
            return state;
        }
    };
};