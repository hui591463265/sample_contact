import{GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, ITEMS_LOADING} from './types';
import axios from 'axios';

//all crud actions
export const getItems=()=>dispatch=>{
    dispatch(setItemsLoading());
    axios
        .get('/api/items')
        .then(res=>
            dispatch({
                type:GET_ITEMS,
                payload:res.data
            }))
}

export const addItem = (item) => dispatch=>{
    axios
        .post('/api/items', item)
        .then(res=>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            }))
}

export const deleteItem = (id) => dispatch=> {
    axios.delete(`/api/items/${id}`)
        .then(res=>
            dispatch({
                type: DELETE_ITEM,
                payload:id
            }))
}

export const updateItem = (item) => dispatch=> {
    let id=item.id;
    axios.put(`/api/items/${id}`/*,item*/,item)
        .then(res=>{    
            dispatch({
                type: UPDATE_ITEM,
                payload: item /* res.data */
            })
        })
}
export const setItemsLoading = () =>{
    return{
        type: ITEMS_LOADING
    }
}