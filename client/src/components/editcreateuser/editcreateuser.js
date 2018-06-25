import React, {Component} from 'react';
import './editcreateuser.css';

import CreateUser from '../createuser/createuser';
import ModifyUser from '../modifyuser/modifyuser';

class EditCreateUser extends Component {

    state = {
        user_roles: [],
    }

    componentDidMount = () => {

        fetch('/api/user/roles', {
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
            const keys = Object.keys(data);
            let roles = []
            for (let i = 0; i < keys.length; i++) {
                if(data.hasOwnProperty(keys[i])){
                    roles.push(data[keys[i]].name);
                }
            }
            this.setState({
                user_roles: roles,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    renderMode = () => {
        let mode = null;
        switch (this.props.mode) {
            case 'view':
            case 'edit':
                mode = (
                    <ModifyUser
                        mode={this.props.mode}
                        user_roles={this.state.user_roles}
                        userdata={this.props.userdata}
                        refreshUserList={this.props.refreshUserList}
                    />
                )
                break;

            default:
                mode = (
                    <CreateUser user_roles={this.state.user_roles}
                        refreshUserList={this.props.refreshUserList}
                    />
                )
                break;
        }

        return mode;
    }

    render(){

            return(
                <div className="edituser">
                    <div className="edituser-forms">
                        {this.renderMode()}
                    </div>
                </div>
            )
    }
}

export default EditCreateUser;