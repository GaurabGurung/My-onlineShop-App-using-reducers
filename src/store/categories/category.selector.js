export const selectCategoriesMap = (state) => (
    state.categories.categories
    .reduce((acc, category)=> {  //here .docs is a methods to fetch the documents, which are hats, jackets etc
        const { title, items } = category; //inside the document, it is getting title and items, and then assigns the items data into their respective title arrays

        acc[title.toLowerCase()] = items;  //This part assigns the items array to the value associated with the "title', we are using an array: [title] because title is property with multiple values in each object 
        return acc;
    }, {})
   
)