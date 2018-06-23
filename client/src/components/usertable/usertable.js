import React, {Component} from 'react';
import './usertable.css';

import ReactTable from "react-table";
import "react-table/react-table.css";

class UserTable extends Component {
    constructor(){
        super();
        this.state = {
            loading: true,
        }
    }
    render(){
        const columns = [
            {Header: "First Name", accessor: "first_name"}
          ];
        return(
            <div>user table</div>
        )
    }
}

export default UserTable;