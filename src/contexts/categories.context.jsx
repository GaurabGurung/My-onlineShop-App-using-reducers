import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap : {},
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async ()=> {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, [])

    

    /**
        this function helps to add a js database to the firestore, 
        but we use it only once because we dont want to replicate the document everytime it runs
        
        useEffect(()=> {
         addCollectionAndDocuments( 'catogories', SHOP_DATA );
        }, [])
     */

    const value = {categoriesMap};
    return (
        <CategoriesContext.Provider value={value}> {children}</CategoriesContext.Provider>   
    )
};