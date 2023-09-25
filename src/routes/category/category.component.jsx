//Full category listing of the products

import './category.styles.scss';
import { useParams } from 'react-router-dom'; // gives back the value as an object
import { Fragment, useContext, useEffect, useState} from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/Product-card/product-card.component';

const Category = () => {
    const { category } = useParams(); //useParams : Returns an object of key/value pairs of the dynamic params from the current URL that were matched by the route path.
    const { categoriesMap } = useContext(CategoriesContext);
    const [ products, setProducts] = useState(categoriesMap[category])

    useEffect(()=> {
        setProducts(categoriesMap[category]);
    }, [category,categoriesMap])

    return (
        <Fragment>
            <h2 className='category-title'> {category.toLocaleUpperCase()} </h2>
            <div className='category-container'>
                {products && //Before mapping over the products, you check if products is not null or undefined. This is a safeguard to ensure that you don't attempt to map over products if it's not yet defined.
                    products.map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </div>         
        </Fragment>
    )
}

export default Category;

