import {configureStore, combineReducers} from "@reduxjs/toolkit";
import pagesSlice from "../state/pagesSlice";
import anchorsSlice from "../state/anchorsSlice";

const rootReducer = combineReducers({
    pages: pagesSlice,
    anchors: anchorsSlice
})

export const store = configureStore({
    reducer: rootReducer
})
