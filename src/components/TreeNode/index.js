import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";

import {toggleOpen, setSelectedEntity, setSelectedNodeId} from "../state/pagesSlice";
import {setSelectedAnchorId} from "../state/anchorsSlice";
import {ReactComponent as Arrow} from './arrow.svg';

import './TreeNode.scss';


const TreeNode = React.memo(({node, getChildNodes, level = 0}) => {
    const dispatch = useDispatch();

    const selectedNodeId = useSelector(state => state.pages.selectedNodeId);
    const loading = useSelector(state => state.pages.loading);
    const anchors = useSelector(state => state.anchors.anchors);
    const selectedAnchorId = useSelector(state => state.anchors.selectedAnchorId);


    const handleNodeClick = event => {
        event.preventDefault();
        dispatch(setSelectedEntity(node));
        dispatch(setSelectedNodeId(node.id));
        dispatch(toggleOpen(node));
    }

    const handleAnchorClick = (anchor, event) => {
        event.preventDefault();
        dispatch(setSelectedEntity(anchor));
        dispatch(setSelectedAnchorId(anchor.id));
    }

    const renderAnchors = (nodeAnchors = []) => {
        return (
            nodeAnchors.length > 0 && (
                <ul className='anchors_list'>
                    {
                        nodeAnchors.map(anchor => {
                            const currentAnchor = anchors[anchor];
                            return (
                                <li
                                    key={currentAnchor.id}
                                    role="button"
                                    onClick={handleAnchorClick.bind(this, currentAnchor)}
                                    className={currentAnchor.id === selectedAnchorId ? 'anchor selected' : 'anchor'}
                                >
                                    <span className="anchor__title">
                                        {currentAnchor.title}
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        )
    }

    const renderChildren = () => {
        const childrenNodeArr = getChildNodes(node);
        return (
            childrenNodeArr.length > 0 && (
                <ul className= {'level-' + node.level}>
                    {
                        childrenNodeArr.map(childNode => (
                            <TreeNode
                                getChildNodes={getChildNodes}
                                node={childNode}
                                key={childNode.id}
                                level={level + 1}
                            />
                        ))
                    }
                </ul>
            )
        );
    }

    return (
        <React.Fragment>
            <li>
                <div>
                    <div className={loading ? 'loading' : 'treeNode__item_main'}>
                        <div className={node.open ? 'treeNode__arrow revert' : 'treeNode__arrow'}>
                            {
                                node.pages &&
                                <Arrow/>
                            }
                        </div>
                        <span
                            role="link"
                            className={selectedNodeId === node.id ? 'selected' : ''}
                            onClick={handleNodeClick}
                        >
                            {node.title}
                        </span>
                    </div>

                    {!loading && node.open && renderAnchors(node.anchors)}
                </div>
            </li>
            {node.pages && node.open && renderChildren()}
        </React.Fragment>
    )
})


export default TreeNode;
