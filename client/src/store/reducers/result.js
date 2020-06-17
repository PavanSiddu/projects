import * as actionTypes from '../actions';
import * as Axios from '../../all-axios';

const initialState = {
    results: []
};

(async () => {
    // let initial_data = []
    initialState.results = (await Axios.get_data()).data.data
    //initial_data =[...todo.data.data];
    // for(let i=0;i<todo.data.data.length;i++){
    //     initial_data[i] = todo.data.data[i];
    // }
    // console.log(initial_data);
})();

const reducer = (state = initialState, action) => {
    //For EDIT_RESULT
    const edit = async (val) => {
        if (val._id === action.Id) {
            val.todos = action.value;
            let comp = await Axios.put_data(val);
            console.log(comp);
            return val;
        }
        return val;
    }

    //completed
    const completed = async (val) => {
        if (val._id === action.resultElId) {
            val.status = action.status;
            let comp = await Axios.put_data(val);
            console.log(comp);
            return val;
        }
        return val
    }
    //trash
    const trash = async (val) => {
        if (val._id === action.trashId) {
            val.status = action.status;
            let comp = await Axios.put_data(val);
            console.log(comp);
            return val
        }
        return val
    }
    //undo
    const undo = async (val) => {
        if (val._id === action.undoId) {
            val.status = action.status;
            let comp = await Axios.put_data(val);
            console.log(comp);
            return val;
        }
        return val;
    }
    //delete
    // const del = async (val) => {
    //     if (val._id === action.delId) {
    //         val.status = action.status;
    //         let comp = await Axios.delete_data(val);
    //         console.log(comp);
    //         return val;
    //     }
    //     return val;
    // }
    //switch Actions 
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            console.log(action.status, action.result, action.id);
            return {
                ...state,
                results: state.results.concat({ _id: action.id, todos: action.result, status: action.status, _v: 0 })
            }

        case actionTypes.DELETE_RESULT:
            const updatedArray = state.results.filter(completed);
            return {
                ...state,
                results: updatedArray,
            }

        case actionTypes.EDIT_RESULT:
            const array = state.results.filter(edit);
            return {
                ...state,
                results: array
            }

        case actionTypes.TRASH_RESULT:
            const trashArray = state.results.filter(trash);
            console.log(trashArray);
            return {
                ...state,
                results: trashArray,
            }

        case actionTypes.DELETE_TRASH:
            const deltrash = state.results.filter(result => result._id !== action.delId);
            //const deltrash = state.results.filter(del);
            state.results.map((todo) => {
                if (todo._id === action.delId) {
                    (async () => {
                        let comp = await Axios.delete_data(todo);
                        console.log(comp);
                    }
                    )();
                }
            })
            console.log(deltrash);
            return {
                ...state,
                results: deltrash
            }


        case actionTypes.UNDO_TRASH:
            const untrash = state.results.filter(undo)
            return {
                ...state,
                results: untrash
            }
        case actionTypes.DELETE_ALL:
            const DelAll = state.results.filter(result => result.status !== 2);
            (async () => {
                let k = await Axios.delete_All()
                console.log(k);
            })();
            return {
                ...state,
                results: DelAll
            }
    }
    return state;
};

export default reducer;