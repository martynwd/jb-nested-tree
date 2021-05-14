import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios";

import {setNodes} from "../state/pagesSlice";
import {setAnchors} from "../state/anchorsSlice";
import Tree from "../Tree";
const http = axios.create();

const SideNav = () => {
    const dispatch = useDispatch();

    const pages = useSelector(state => state.pages.nodes);
    const anchors = useSelector(state => state.anchors.anchors);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [loading, setLoading] = useState(false);



    const fetchItems = async () => {
        setLoading(true);
        try {
            const data = await http.get('/help/idea/2018.3/HelpTOC.json');
            dispatch(setNodes(data.data.entities.pages));
            dispatch(setAnchors(data.data.entities.anchors))

        } catch (e) {
            console.error(e);
        } finally {
            console.log('pages', pages);
            console.log('anchors', anchors);
            setLoading(false)
        }

    }

    useEffect(() => {
      fetchItems();
    },[])


    return (
        <div>
            SideNav
            Пользователь <b>{loading ? 'сейчас' : 'не'}</b> на сайте.
            <Tree
                entityId={""}
                entityTitle={""}
            />
        </div>

    )
}

export default SideNav;
