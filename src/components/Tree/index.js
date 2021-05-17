import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setNodes,
    setSelectedEntity,
    setSelectedNodeId,
    setEntityFromAPi,
    toggleOpen
} from "../state/pagesSlice";
import TreeNode from "../TreeNode";
import {setSelectedAnchorId} from "../state/anchorsSlice";


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
        const currentNode = {
            ...nodes[node.id],
            open: true
        }
        console.log('parentNODE' ,parentNode)
        const updatedNodes = {
            ...nodes,
            [node.id]: currentNode,
            [parentNode.id]: parentNode
        }
        return recursiveOpen(updatedNodes, parentNode, parentNode.level)
    }

    const entityFromAPi = useSelector(state => state.pages.entityFromAPi);


    useEffect(()=> {
        if (entityId && entityId !== entityFromAPi) {
            const selectedNode = nodes[entityId];
            if (selectedNode) {
                dispatch(setEntityFromAPi(entityId))
                dispatch(setNodes(recursiveOpen(nodes, selectedNode, selectedNode.level)));
                dispatch(setSelectedNodeId(entityId))
                return;
            }
            const selectedAnchor = anchors[entityId];
            console.log('ew', entityId, selectedAnchor)
            if (selectedAnchor) {
                const parentAnchorId = selectedAnchor.parentId;
                console.log('first launch', nodes[parentAnchorId])
                dispatch(setNodes(recursiveOpen(nodes, nodes[parentAnchorId], nodes[parentAnchorId].level)));
                dispatch(setEntityFromAPi(entityId))
                dispatch(setSelectedAnchorId(entityId))
            }
        }
    }, [nodes, anchors])

    const getRootNodes = nodes => nodes.filter(node => node.level === 0);

    const getChildNodes = node => node.pages.map(title => nodes[title]);

    const rootNodes = getRootNodes(Object.values(nodes))


    return (
        <ul>
            {rootNodes.map(node => (
                <TreeNode
                    key = {node.id}
                    node = {node}
                    getChildNodes={getChildNodes}
                />
            ))}
        </ul>
    )
}

export default Tree;
