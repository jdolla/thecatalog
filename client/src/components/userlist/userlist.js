import React, {Component} from 'react';
import ReactTable from 'react-table'
import './userlist.css';


class UserList extends Component{

    getUserList = () => {
        fetch("/api/user?page=1&items=20&sortBy=first_name&sortDir=-1", {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache': 'no-cache'
              },
        }).then( resp => {
            console.log(resp)
            return resp.json();
        }).then( data => {
            console.log(data);
        })
    }

    render(){
        this.getUserList();
        const data = [{
            name: 'Tanner Linsley',
            age: 26,
            friend: {
              name: 'Jason Maurer',
              age: 23,
            }
          }]

          const columns = [{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
          }, {
            Header: 'Age',
            accessor: 'age',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
          }, {
            id: 'friendName', // Required because our accessor is not a string
            Header: 'Friend Name',
            accessor: d => d.friend.name // Custom value accessors!
          }, {
            Header: props => <span>Friend Age</span>, // Custom header components!
            accessor: 'friend.age'
          }]

        return(
            <ReactTable
            data={data}
            columns={columns}
          />
        )
    }
}

export default UserList;