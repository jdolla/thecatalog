import React, { Component } from 'react';
import './productsandoffers.css';

import ProductManagement from '../productmanagement/productmanagement';

class ProductsAndOffers extends Component {
    state = {
        showOffer: false
    }

    handleSwitch = (event) => {
        this.setState({
            showOffer: event.target.checked,
        });
    }

    render() {
        const showOffer = this.state.showOffer;

        return (
            <div className="ProductsAndOffers">
                <div className="ProductsAndOffers-Header">
                    <div className="left">
                        Product Management
                    </div>
                    <div className="input-switch">
                        <label className="switch">
                            <input type="checkbox"
                                checked={this.state.showOffer}
                                onChange={this.handleSwitch}/>
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="right">
                        Offer Mangaement
                    </div>
                </div>
                <div className="po-wrapper">
                    <div className={"po-product" + ((showOffer) ? " inactive" : " active")}>
                        <ProductManagement/>
                    </div>
                    <div className={"po-offer" + ((showOffer) ? " active" : " inactive")}>
                    </div>
                </div>


            </div>
        )
    }
}

export default ProductsAndOffers;