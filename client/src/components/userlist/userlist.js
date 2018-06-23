import React, {
  Component
} from 'react';
import './userlist.css';
import ErrorPage from '../errorpage/errorpage';
import NotAuthorized from '../notauthorized/notauthorized';
import ReactTable from "react-table";
import "react-table/react-table.css";

const moment = require('moment')

class UserList extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pages: -1,
      loading: true,
      error: ""
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(state, instance) {
    this.setState({ loading: true });
    const {page, pageSize, sorted, filtered} = state;
    this.getUserList(page, pageSize, sorted, filtered);
  }

  getUserList = (page, pageSize, sorted, filtered) => {
      const query = {
        page,
        pageSize,
        sorted,
        filtered
      }

      fetch(`/api/user`, {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(query),
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Cache': 'no-cache'
            },
      }).then( resp => {
          if(!resp.ok){
            throw Error(resp.status);
          }
          return resp.json();
      }).then( data => {
        const users = data.users.map(user => {
          const roles = user.user_roles;
          user.user_roles = roles.sort().join(', ');

          const created = user.createdAt;
          user.createdAt = moment(created).format('YYYY-MM-DD @ HH:mm');

          return user;
        })

        this.setState({
          data: data.users,
          pages: data.pagesInfo.totalPages,
          pagedata: data.pagesInfo,
          loading: false,
        })
      }).catch(err => {
        this.setState({
          error: err,
        })
      })
  }


  render() {
    if (this.state.error) {
      if (this.state.error.message.includes("401")) {
        return <NotAuthorized / >
      }
      return <ErrorPage / >
    } else {
      const { data, pages, loading } = this.state;

      const columns = [
        {Header: "First Name", accessor: "first_name"},
        {Header: "Last Name", accessor: "last_name"},
        {Header: "Email", accessor: "email"},
        {Header: "Created", accessor: "createdAt"},
        {Header: "Status", accessor: "status"},
        {Header: "Roles", accessor: "user_roles", sortable: false},
      ]

      return (
        <div>
          <ReactTable
            columns={columns}
            manual
            data={data}
            pages={pages}
            loading={loading}
            onFetchData={this.fetchData}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
      )
    }
  }
}

export default UserList;