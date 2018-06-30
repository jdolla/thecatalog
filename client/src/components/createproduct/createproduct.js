import React, { Component } from 'react';

import './createproduct.css';


class CreateProduct extends Component {
    constructor(){
        super();

        this.state = {
            product_name: "",
            product_description: "",
        }

    }

    resetForm = () => {
        this.setState({
            product_name: "",
            product_description: "",
        })
    }

    handleClear = (event) => {
        event.preventDefault();
        this.resetForm();
    }

    handleSave = event => {
        event.preventDefault();
        const productForm = event.target.parentElement.parentElement;

        if(productForm.checkValidity()){
            const newProduct = {
                name: this.state.product_name,
                description: this.state.product_description,
            }

            fetch("/api/product/save", {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(newProduct),
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
            productForm.reportValidity();
        }

    }


    handleChange = (event) => {
        const target = event.target;
        this.setState({
            [target.name]:target.value
        })
    }

    render() {

        const val_pname = (this.state.product_name) ? " hidden" : "";
        const val_pdesc = (this.state.product_description) ? " hidden" : "";

        return (
            <div className="CreateProduct">
                <div className="heading">
                    Create New Product
                </div>
                <form action="submit" className="CreateProduct-form">
                    <div className="createproduct-input">
                        <label htmlFor="product_name">product name
                            <span className={"tooltip-text" + val_pname}>*required</span>
                        </label>
                        <br/>
                        <input
                            type="text"
                            name="product_name"
                            value={this.state.product_name}
                            onChange={this.handleChange}
                            required/>
                    </div>
                    <div className="createproduct-input" >
                        <label htmlFor="product_description">product description
                            <span className={"tooltip-text" + val_pdesc}>*required</span>
                        </label>
                        <br/>
                        <textarea
                            type="textarea"
                            name="product_description"
                            value={this.state.product_description}
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

export default CreateProduct;