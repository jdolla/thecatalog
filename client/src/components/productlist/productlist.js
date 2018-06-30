import React, { Component } from 'react';
import './productlist.css';

import ReactTable from "react-table";
import "react-table/react-table.css";

class ProductList extends Component {

    state = {
        data:[]
    }

    componentDidMount(){
        this.getProducts();
    }

    componentDidUpdate(prevProps) {
        if(this.props.refreshList !== prevProps.refreshList){
            this.getProducts();
        }
    }

    getProducts = () => {
        fetch("/api/product", {
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
            this.setState({
                data
            })
        }).catch(err => {
            console.log(err)
        });
    }

    render() {

        const columns = [{
            Header: "Goat Soap Products",
            columns: [
              {Header: "Product Name", accessor: "name", maxWidth: 200},
              {Header: "Product Description", accessor: "description", maxWidth: 200},
            ]
          }]


        return (
            <div className="ProductList">
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

export default ProductList;