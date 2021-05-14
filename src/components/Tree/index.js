import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setNodes} from "../state/pagesSlice";


const Tree = ({entityId, entityTitle}) => {
    const dispatch = useDispatch();

    const nodes = useSelector(state => state.pages.nodes);
    const anchors = useSelector(state => state.anchors.anchors)

    const recursiveOpen = (nodes, node, level) => {
        if (level === 0) {
            return nodes;
        }
        const parentNode = {
            ...nodes[node.parentId],
            open: true
        }
        const updatedNodes = {
            ...nodes,
            [parentNode.id]: parentNode
        }
        return recursiveOpen(updatedNodes, parentNode, parentNode.level)
    }

    const [selectedNodeId, setSelectedNodeId] = useState('')
    const [selectedAnchorId, setSelectedAnchorId] = useState('');
    const [currEntityId, setCurrEntityId] = useState('');
    const [currEntityTitle, setCurrEntityTitle] = useState('');

    if (entityId && entityId !== currEntityId) {
        const selectedNode = nodes[entityId];
        if (selectedNode) {
            setSelectedNodeId(entityId);
            setCurrEntityId(entityId);
            dispatch(setNodes(recursiveOpen(nodes, selectedNode, selectedNode.level)));
            return;
        }
        const selectedAnchor = anchors[entityId];
        if (selectedAnchor) {
            const parentAnchorId = selectedAnchor.id;
            dispatch(setNodes(recursiveOpen(nodes, nodes[parentAnchorId], nodes[parentAnchorId].level)));
            setSelectedNodeId(parentAnchorId);
            setCurrEntityId(entityId);
        }
    }

    if (entityTitle && entityTitle !== currEntityTitle) {
        const arrNodes = Object.entries(nodes);
        const arrAnchors = Object.entries(anchors);

        if (arrNodes.length > 0) {
            const selectedObj = arrNodes.find(
                node => node[1].title === entityTitle
            );

            if (selectedObj) {
                const [id, selectedNode] = selectedObj;
                dispatch(setNodes(recursiveOpen(nodes, selectedNode, selectedNode.level)));
                setSelectedNodeId(id);
                setCurrEntityTitle(entityTitle);
            }
        }

        if (arrAnchors.length > 0) {
            const selectedObj = arrNodes.find(
                anchor => anchor[1].title === entityTitle
            );

            if (selectedObj) {
                const [id, selectedAnchor] = selectedObj;
                dispatch(setNodes(recursiveOpen(nodes, nodes[selectedAnchor.parentId], nodes[selectedAnchor.parentId].level)));
                setSelectedNodeId(selectedAnchor.parentId)
                setSelectedAnchorId(id);
                setCurrEntityTitle(entityTitle);
            }
        }
    }


    return (
        <div>Tree</div>
    )
}

export default Tree;
