import {createSlice} from '@reduxjs/toolkit';

const pagesSlice = createSlice({
    name: 'pages',
    initialState: {
        nodes: {},
        selectedNodeId: '',
        selectedEntity: null
    },

    reducers: {
        setNodes(state, action){
            state.nodes = action.payload;
        },

        setSelectedEntity(state, action) {
            console.log(action)
            state.selectedEntity = action.payload;
        },

        setSelectedNodeId(state, action) {
            console.log('acr', action)
            state.selectedNodeId = action.payload;
        },

        toggleOpen(state, action) {
            const node = action.payload;
            const updatedNode = {...state.nodes[node.id], open: !node.open }
            state.nodes = {...state.nodes, [node.id]: updatedNode }
            console.log('curstate', updatedNode)
        }
    },

})

export const {setNodes, setSelectedEntity, setSelectedNodeId, toggleOpen} = pagesSlice.actions

export default pagesSlice.reducer
