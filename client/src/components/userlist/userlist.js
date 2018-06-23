import React, {Component} from 'react';
// import ReactTable from 'react-table'
import './userlist.css';
import ErrorPage from '../errorpage/errorpage';
import NotAuthorized from '../notauthorized/notauthorized';

class UserList extends Component{

    state = {
      userdata: {},
      pagedata: {},
    }

    getUserList = (page, items, sortBy, sortDir) => {
        const queryParms = [
          `page=${page || 1}`,
          `items=${items || 10}`,
          `sortBy=${sortBy || "first_name"}`,
          `sortDir=${sortDir || -1}`
        ];

        fetch(`/api/user?${queryParms.join("&")}`, {
            method: 'GET',
            credentials: 'include',
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
          this.setState({
            userdata: data.users,
            pagedata: data.pagesInfo,
          })
        }).catch(err => {
          this.setState({
            error: err,
          })
        })
    }

    componentDidMount = () => {
      this.getUserList();
    }

    render(){
      if(this.state.error){
        if (this.state.error.message.includes("401")){
          return <NotAuthorized/>
        }
        return <ErrorPage/>
      } else {
        return (
          <div>Show Real Stuff Here</div>
        )
      }
    }
}

export default UserList;