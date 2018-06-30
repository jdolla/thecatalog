import React, { Component } from 'react';
import BrandPicker from '../brandpicker/brandpicker';

import './offerlist.css';


class OfferList extends Component{

    componentWillMount = () => {

    }

    render(){
        return(
            <div>
                Offer List Here
                <BrandPicker selectedBrand={{}}/>
            </div>
        )
    }
}

export default OfferList;