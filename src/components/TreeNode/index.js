import React, {useEffect} from 'react';
import PropTypes from 'prop-types'
import {useState} from 'react';

import {toggleOpen, setSelectedEntity, setSelectedNodeId} from "../state/pagesSlice";

import {useDispatch, useSelector} from "react-redux";
import {setSelectedAnchorId} from "../state/anchorsSlice";
import './TreeNode.scss'


const TreeNode = React.memo(({node, getChildNodes, level = 0}) => {
    const dispatch = useDispatch();

    const selectedEntity = useSelector(state => state.pages.selectedEntity)
    const selectedNodeId = useSelector(state => state.pages.selectedNodeId)
    const loading = useSelector(state => state.pages.loading)
    const anchors = useSelector(state => state.anchors.anchors)
    const selectedAnchorId = useSelector(state => state.anchors.selectedAnchorId);
    const [isSelected, setSelected] = useState(false);



    useEffect(() => {
        if (selectedEntity && selectedEntity.id === node.id) {
            setSelected(true);
        }
    }, [selectedEntity, node.id])


    const handleNodeClick = event => {

        event.preventDefault();
        dispatch(setSelectedEntity(node))
        dispatch(setSelectedNodeId(node.id))
        dispatch(toggleOpen(node))
    }
    const handleAnchorClick = (anchor, event) => {
        event.preventDefault();
        dispatch(setSelectedEntity(anchor))
        dispatch(setSelectedAnchorId(anchor.id))

    }

    const renderAnchors = (nodeAnchors = []) => {
        return (
            nodeAnchors.length > 0 && (
                <ul>
                    {
                        nodeAnchors.map(anchor => {
                            const currentAnchor = anchors[anchor]
                            return (
                                <li
                                    key={currentAnchor.id}
                                    role = "button"
                                    onClick={handleAnchorClick.bind(this, currentAnchor)}
                                    className={currentAnchor.id === selectedAnchorId ? 'anchorSelected' : ''}
                                >
                                    {currentAnchor.title}
                                </li>
                            )
                        })
                    }
                </ul>
            )
        )
    }

    const renderChildren = () =>{
        const childrenNodeArr = getChildNodes(node);
        console.log('childrenarr', childrenNodeArr)
        return (
            childrenNodeArr.length > 0 && (
                <ul>
                    {
                        childrenNodeArr.map(childNode => (
                            <TreeNode
                                getChildNodes={getChildNodes}
                                node = {childNode}
                                key = {childNode.id}
                                level = {level + 1}
                            />
                        ))
                    }
                </ul>
            )
        )
    }
    return (
        <React.Fragment>
            <li>
                <div>
                <span
                    role="link"
                    className={selectedNodeId === node.id && node.open ? 'anchorSelected' : ''}
                    onClick={handleNodeClick}
                >
                    {node.title}
                </span>
                    {!loading && node.open && renderAnchors(node.anchors)}
                </div>
            </li>
            {node.pages && node.open &&  renderChildren()}
        </React.Fragment>

    )
})



export default TreeNode;
