import React, {Component} from 'react';
import './editcreateuser.css';

import CreateUser from '../createuser/createuser';


class EditCreateUser extends Component {

    state = {
        mode: "view"
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if(this.props.userdata && this.props.userdata !== prevProps.userdata){
            this.setState({
                mode: "view"
            })
        }
    }

    handleEditClick = () => {
        if(this.props.userdata){
            this.setState({
                mode: "edit"
            })
        }
    }

    handleCreateClick = () => {
        this.props.clearSelection();
        this.setState({
            mode: "create"
        })
    }

    renderMode = () => {
        let mode = null;
        switch (this.state.mode) {
            case 'view':
            case 'edit':
                mode = (
                    <div>
                        {this.state.mode}
                    </div>
                )
                break;

            default:
                mode = (
                    <CreateUser/>
                )
                break;
        }

        return mode;
    }
    render(){

            return(
                <div className="edituser">
                    <div className="edituser-buttons">

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

                    </div>
                    <div className="edituser-forms">
                        <div>
                            {this.renderMode()}
                        </div>
                    </div>
                </div>
            )
    }
}

export default EditCreateUser;