import React, { Component } from 'react';
import './offerlist.css';

import ReactTable from "react-table";
import "react-table/react-table.css";


class OfferList extends Component{
    state = {
        data:[]
    }

    componentDidMount(){
        this.getOffers();
    }

    componentDidUpdate(prevProps) {
        if(this.props.refreshList !== prevProps.refreshList){
            this.getOffers();
        }
    }

    getOffers = () => {
        fetch("/api/offer", {
            method: 'GET',
            credentials: 'include',
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

            data.forEach(offer => {
                offer.product = offer.product.name;
            })

            this.setState({
                data
            })

        }).catch(err => {
            console.log(err)
        });
    }

    render(){

        const columns = [{
            Header: "Goat Soap Offers",
            columns: [
              {Header: "Offer Name", accessor: "name"},
              {Header: "Brand Name", accessor: "brand"},
              {Header: "Offer Description", accessor: "description"},
              {Header: "Product Name", accessor: "product"},
              {Header: "Price", accessor: "price"},
              {Headder: "Qty", accessor: "quantity"}
            ]
          }]

        return(
            <div className="OfferList">
                <ReactTable
                    data={this.state.data}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    style={{height: "500px"}}
                />
            </div>
        )
    }
}

export default OfferList;