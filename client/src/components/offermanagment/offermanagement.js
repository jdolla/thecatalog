import React, { Component } from 'react';
import './offermanagement.css';

import CreateOffer from '../createoffer/createoffer';
import OfferList from '../offerlist/offerlist';

class OfferManagement extends Component {
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
            <div className="OfferManagement">
                <div className="left">
                    <OfferList refreshList={this.state.refresh}/>
                </div>
                <div className="middle">
                </div>
                <div className="right">
                    <CreateOffer refreshList={this.refreshList}/>
                </div>
            </div>
        )
    }
}

export default OfferManagement;