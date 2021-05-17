import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import axios from "axios";

import {setNodes, setLoading} from "../../state/pagesSlice";
import {setAnchors} from "../../state/anchorsSlice";
import Tree from "../Tree";
import './SideNav.scss';

const http = axios.create();

const SideNav = () => {
    const dispatch = useDispatch();


    const fetchItems = async () => {
        dispatch(setLoading(true));
        try {
            const data = await http.get('/help/idea/2018.3/HelpTOC.json');
            dispatch(setNodes(data.data.entities.pages && data.data.entities.pages));
            dispatch(setAnchors(data.data.entities.anchors && data.data.entities.anchors));
        } catch (e) {
            console.error(e);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
      fetchItems();
    },[]);


    return (
        <div className="sidenav">
            <Tree
                //It's some id from API for immediately open a specific menu item
                entityId={""} // for example that id: 'touroftheUI'
            />
        </div>
    );
}

export default SideNav;
