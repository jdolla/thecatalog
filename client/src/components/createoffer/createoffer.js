import React, { Component } from 'react';

import './createoffer.css';


class CreateOffer extends Component {
    constructor(){
        super();

        this.state = {
            brands: [],
            products: [],
            offer_brand: "",
            offer_product: "",
            offer_name: "",
            offer_description: "",
            offer_price: "",
            offer_quantity: 0,
        }

    }

    componentDidMount = () => {
        this.getBrands();
        this.getProducts();
    }

    getBrands = () => {
        fetch('/api/brand', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache': 'no-cache'
            },
        }).then(data => {
            if (data.ok){
                return data.json();
            } else {
                throw Error(data.status)
            }
        }).then(data => {
            const brands = data.map(brand => {
                return brand.name;
            });

            this.setState({
                brands
            })
        })
    }

    getBrandOptions = () => {
        return this.state.brands.sort((a, b) =>{
            return a < b;
        }).map((brand, i) => {
            return <option key={i} value={brand}>{brand}</option>
        })
    }

    getProducts = () => {
        fetch('/api/product', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache': 'no-cache'
            },
        }).then(data => {
            if (data.ok){
                return data.json();
            } else {
                throw Error(data.status)
            }
        }).then(data => {
            this.setState({
                products: data
            })
        })
    }

    getproductOptions = () => {
        return this.state.products.sort((a, b) => {
            return a.name > b.name;
        }).map((product, i) => {
            return (
                <option value={product._id} key={i}>{product.name}</option>
            )
        })
    }

    resetForm = () => {
        this.setState({
            offer_name: "",
            offer_description: "",
            offer_brand: "",
            offer_product: "",
            offer_price: 0,
            offer_quantity: 0,
        })
    }

    handleClear = (event) => {
        event.preventDefault();
        this.resetForm();
    }


    handleSave = event => {
        event.preventDefault();
        const offerForm = event.target.parentElement.parentElement;

        if(offerForm.checkValidity()){

            const products = this.state.products;
            const {name:prod_name, description:prod_desc} = products.filter(product => {
                return product._id === this.state.offer_product;
            })[0];
            const offer_product = {name: prod_name, description: prod_desc}

            const newOffer = {
                name: this.state.offer_name,
                description: this.state.offer_description,
                brand: this.state.offer_brand,
                price: this.state.offer_price,
                quantity: this.state.offer_quantity,
                product: offer_product
            }

            fetch("/api/offer/save", {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(newOffer),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Cache': 'no-cache'
                }
            }).then(resp => {
                if(!resp.ok){
                    throw Error(`${resp.status} ${resp.statusText}`);
                }
                return resp.json();
            }).then(data => {
                this.props.refreshList();
                this.resetForm();
            }).catch(err => {
                console.log(err)
            });
        } else {
            offerForm.reportValidity();
        }
    }


    handleChange = (event) => {
        const target = event.target;
        this.setState({
            [target.name]:target.value
        })
    }

    render() {

        const val_oname = (this.state.offer_name) ? " hidden" : "";
        const val_odesc = (this.state.offer_description) ? " hidden" : "";
        const val_obrand = (this.state.offer_brand) ? " hidden" : "";
        const val_oprod = (this.state.offer_product) ? " hidden" : "";
        const val_oqty = (this.state.offer_quantity > 0) ? " hidden" : "";
        const val_oprice = (this.state.offer_price > 0) ? " hidden" : "";


        return (
            <div className="CreateOffer">
                <div className="heading">
                    Create New Offer
                </div>
                <form action="submit" className="CreateOffer-form">

                    <div className="createoffer-input">
                        <label htmlFor="offer_name">offer name
                            <span className={"tooltip-text" + val_oname}>*required</span>
                        </label>
                        <br/>
                        <input
                            type="text"
                            name="offer_name"
                            value={this.state.offer_name}
                            onChange={this.handleChange}
                            required/>
                    </div>

                    <div className="createoffer-input" >
                        <label htmlFor="offer_description">offer description
                            <span className={"tooltip-text" + val_odesc}>*required</span>
                        </label>
                        <br/>
                        <textarea
                            type="textarea"
                            name="offer_description"
                            value={this.state.offer_description}
                            onChange={this.handleChange}
                            required/>
                    </div>

                    <div className="createoffer-input">
                        <label htmlFor="offer_brand">brand name
                            <span className={"tooltip-text" + val_obrand}>*required</span>
                        </label>
                        <br/>
                        <select
                            name="offer_brand"
                            value={this.state.offer_brand}
                            onChange={this.handleChange}
                            required>

                            <option value="" disabled>Select a brand</option>
                            {this.getBrandOptions()}
                            </select>
                    </div>

                    <div className="createoffer-input">
                        <label htmlFor="offer_product">product name
                            <span className={"tooltip-text" + val_oprod}>*required</span>
                        </label>
                        <br/>
                        <select
                            name="offer_product"
                            value={this.state.offer_product}
                            onChange={this.handleChange}
                            required>

                            <option value="" disabled>Select a product</option>
                            {this.getproductOptions()}
                            </select>
                    </div>

                    <div className="createoffer-input">
                        <label htmlFor="offer_quantity">quantity
                            <span className={"tooltip-text" + val_oqty}>*required</span>
                        </label>
                        <br/>
                        <input
                            type="number"
                            step="1"
                            name="offer_quantity"
                            value={this.state.offer_quantity}
                            onChange={this.handleChange}
                            required/>
                    </div>

                    <div className="createoffer-input">
                        <label htmlFor="offer_price">price
                            <span className={"tooltip-text" + val_oprice}>*required</span>
                        </label>
                        <br/>
                        <input
                            type="number"
                            step="0.01"
                            name="offer_price"
                            value={this.state.offer_price}
                            onChange={this.handleChange}
                            required/>
                    </div>

                    <div className="buttons">
                        <button onClick={this.handleClear}>Clear</button>
                        <button onClick={this.handleSave}>Save</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateOffer;