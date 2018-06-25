import React, {
  Component
} from 'react';
import './userlist.css';
import ErrorPage from '../errorpage/errorpage';
import NotAuthorized from '../notauthorized/notauthorized';
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import EditCreateUser from '../editcreateuser/editcreateuser';

const CheckboxTable = checkboxHOC(ReactTable);

const moment = require('moment')

class UserList extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pages: -1,
      loading: true,
      error: "",
      selection: "",
      selected: null,
      mode: "view",
      showForms: false,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if(this.state.selected && this.state.selected !== prevState.selected){
        this.setState({
            mode: "view"
        })
    }
  }

  fetchData(state, instance) {
    this.setState({ loading: true });
    const {page, pageSize, sorted, filtered} = state;
    this.setState({
      tableState: {
        page,
        pageSize,
        sorted,
        filtered
      }
    });

    this.getUserList(page, pageSize, sorted, filtered);
  }

  clearSelection = () => {
    this.setState({
      selection: "",
      selected: null,
    })
  }

  refreshUserList = () => {
    const {page, pageSize, sorted, filtered} = this.state.tableState;
    this.getUserList(page, pageSize, sorted, filtered, () => {
      this.state.data.forEach(datum => {
        if(datum._id === this.state.selection){
          return this.setState({
            selected: datum,
          })
        }
      });
    });
  }

  getUserList = (page, pageSize, sorted, filtered, cb) => {
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
          // const roles = user.user_roles;
          // user.user_roles = roles.sort().join(', ');

          const created = user.createdAt;
          user.createdAt = moment(created).format('YYYY-MM-DD');

          return user;
        })

        this.setState({
          data: users,
          pages: data.pagesInfo.totalPages,
          pagedata: data.pagesInfo,
          loading: false,
        }, () => {
          if(cb){
            cb();
          }
        })

      }).catch(err => {
        this.setState({
          error: err,
        })
      })
  }

  clickArrow = (event) => {
    const direction = event.target.className;
    let showForms = direction.includes("left");
    this.setState({
      showForms,
    })
  }

  handleEditClick = () => {
      if(this.state.selected){
          this.setState({
              mode: "edit",
              showForms: true,
          })
      }
  }

  handleCreateClick = () => {
      this.clearSelection();
      this.setState({
          mode: "create",
          showForms: true,
      })
  }

  toggleSelection = (key, shift, row) => {
    this.setState({
      selection: key,
      selected: row,
    });
  };

  isSelected = key => {
    return this.state.selection.includes(key);
  };

  render() {
    if (this.state.error) {
      if (this.state.error.message.includes("401")) {
        return <NotAuthorized / >
      }
      return <ErrorPage / >
    } else {

      const { toggleSelection, isSelected } = this;
      const { data, pages, loading } = this.state;

      const columns = [{
        Header: "Catalog Users",
        columns: [
          {Header: "First Name", accessor: "first_name", maxWidth: 150},
          {Header: "Last Name", accessor: "last_name", maxWidth: 150},
          {Header: "Email", accessor: "email", maxWidth: 400},
          {Header: "Status", accessor: "status", maxWidth: 75},
        ]
      }]

      const checkboxProps = {
        isSelected,
        toggleSelection,
        selectType: "radio",
        getTrProps: (s, r) => {
          if(!r){
            return {};
          }
          const selected = this.isSelected(r.original._id);
          return {
            style: {
              backgroundColor: selected ? "#a2d2df" : "inherit"
            }
          };
        }
      };


      const formClass = (this.state.showForms) ? "" : " hidden"

      return (
        <div className="UserList">
          <div className="UserList-user-table">
            <CheckboxTable
                columns={columns}
                manual
                data={data}
                pages={pages}
                loading={loading}
                onFetchData={this.fetchData}
                defaultPageSize={10}
                className="-striped -highlight"
                style={{height: "500px"}}
                ref={r => (this.checkboxTable = r)}
                {...checkboxProps}
              />
          </div>
          <div className="userlist-buttons">
            <div className="button create-user"
                onClick={this.handleCreateClick}>
                <img src="./images/create.png" alt="create"/>
                <span className="tooltip-text">Create New User</span>
            </div>

            <div className="button edit-user"
                onClick={this.handleEditClick}>
                <img src="./images/edit2.png" alt="edit"/>
                <span className="tooltip-text">Edit User</span>
            </div>
            <div></div>
            <div>
              <div className="arrow-right arrow" onClick={this.clickArrow}></div>
            </div>
            <div>
              <div className="arrow-left arrow" onClick={this.clickArrow}></div>
            </div>
          </div>
          <div className={"UserList-form" + formClass}>
            <EditCreateUser
              userdata={this.state.selected}
              clearSelection={this.clearSelection}
              mode={this.state.mode}
              refreshUserList={this.refreshUserList}
            />
          </div>
        </div>
      )
    }
  }
}

export default UserList;