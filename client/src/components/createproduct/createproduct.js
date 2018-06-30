import React, { Component } from 'react';
import BrandPicker from '../brandpicker/brandpicker';

import './createproduct.css';


class CreateProduct extends Component {
    constructor(){
        super();

        this.state = {
            brand: '',
        }
    }

    changeBrand = (brand) => {
        this.setState({ brand });
    }

    render() {
        const brand = this.state.brand;

        return (
            <div className="CreateProduct">
                <BrandPicker selectedOption={brand}
                    changeBrand={this.changeBrand}/>
            </div>
        )
    }
}

export default CreateProduct;