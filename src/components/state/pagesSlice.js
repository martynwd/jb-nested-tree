import {createSlice} from '@reduxjs/toolkit';

const pagesSlice = createSlice({
    name: 'pages',
    initialState: {
        nodes: {},
        selectedNodeId: '',
        selectedEntity: null,
        entityFromAPi: '',
        loading: false
    },

    reducers: {
        setNodes(state, action){
            state.nodes = action.payload;
        },

        setSelectedEntity(state, action) {
            state.selectedEntity = action.payload;
        },

        setSelectedNodeId(state, action) {
            state.selectedNodeId = action.payload;
        },

        setEntityFromAPi(state, action) {
            state.entityFromAPi = action.payload;
        },

        toggleOpen(state, action) {
            const node = action.payload;
/*            if(node.open){
                console.log('node', node)
            }*/
            const updatedNode = {...state.nodes[node.id], open: !node.open }

            state.nodes = {...state.nodes, [node.id]: updatedNode }
        },

        setLoading(state, action) {
            state.loading = action.payload;
        }
    },

})

export const {
    setNodes,
    setSelectedEntity,
    setSelectedNodeId,
    setEntityFromAPi,
    setLoading,
    toggleOpen
} = pagesSlice.actions

export default pagesSlice.reducer
