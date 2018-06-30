import React, { Component } from 'react';
import ProductList from '../productlist/productlist';
import './offerlist.css';


class OfferList extends Component{

    render(){
        return(
            <div>
                <ProductList/>
            </div>
        )
    }
}

export default OfferList;