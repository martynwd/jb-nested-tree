import {createSlice} from '@reduxjs/toolkit';

const pagesSlice = createSlice({
    name: 'pages',
    initialState: {
        nodes: {},
    },

    reducers: {
        setNodes(state, action){
            state.nodes = action.payload;
        },
    },

})

export const {setNodes} = pagesSlice.actions

export default pagesSlice.reducer
