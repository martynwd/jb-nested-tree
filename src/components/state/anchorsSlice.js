import {createSlice} from '@reduxjs/toolkit';

const anchorsSlice = createSlice({
    name: 'anchors',
    initialState: {
        anchors: {},
    },

    reducers: {
        setAnchors(state, action){
            state.anchors = action.payload;
        },
    },

})

export const {setAnchors} = anchorsSlice.actions

export default anchorsSlice.reducer
