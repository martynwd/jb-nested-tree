import {createSlice} from '@reduxjs/toolkit';

const anchorsSlice = createSlice({
    name: 'anchors',
    initialState: {
        anchors: {},
        selectedAnchorId: ''
    },

    reducers: {
        setAnchors(state, action){
            state.anchors = action.payload;
        },

        setSelectedAnchorId(state, action) {
            state.selectedAnchorId = action.payload;
        }
    },

})

export const {setAnchors, setSelectedAnchorId} = anchorsSlice.actions

export default anchorsSlice.reducer
