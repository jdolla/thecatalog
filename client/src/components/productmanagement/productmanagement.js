import React, { Component } from 'react';
import './productmanagement.css';

import CreateProduct from '../createproduct/createproduct';
import ProductList from '../productlist/productlist';

class ProductManagement extends Component {
    state = {
        refresh: false,
    }

    refreshList = () => {
        this.setState({
            refresh: !this.state.refresh,
        })
    }

    render() {
        return (
            <div className="ProductManagement">
                <div className="left">
                    <ProductList refreshList={this.state.refresh}/>
                </div>
                <div className="middle">
                </div>
                <div className="right">
                    <CreateProduct refreshList={this.refreshList}/>
                </div>
            </div>
        )
    }
}

export default ProductManagement;