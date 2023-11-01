import { createSelector } from "reselect";

const selectCategoriesReducer = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => categoriesSlice.categories 
);
/**
    This instance of createSelector helps us for the memoization of the state value that we want to memoize
    The first argument is that reducer from our reducer stor, which we want to memoize,
    then we pass its value as an argument in the second argument and then only return a new value if the value changes of that reducerSlice
 */
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => (
        categories.reduce((acc, category)=> {  //here .docs is a methods to fetch the documents, which are hats, jackets etc
            const { title, items } = category; //inside the document, it is getting title and items, and then assigns the items data into their respective title arrays
    
            acc[title.toLowerCase()] = items;  //This part assigns the items array to the value associated with the "title', we are using an array: [title] because title is property with multiple values in each object 
            return acc;
        }, {})
       
    )
)

