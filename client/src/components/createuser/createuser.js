import React, {Component} from 'react';
import './createuser.css'


class CreateUser extends Component{

    state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        conf_password: "",
        user_roles: [],
    }

    roleOptions = () => {
        const roles = this.props.user_roles;
        const OptionList = roles.map((elem, i) => {
            return (
                <option key={i}
                    value={elem}>{elem}
                </option>
            )
        });
        return OptionList;
    }

    handleChange = (event) => {
        const target = event.target;
        if(target.name === 'user_roles'){
            let roles = [];
            const options = target.options;
            for (let i = 0; i < options.length; i++) {
                const opt = options[i];
                if(opt.selected){
                    roles.push(opt.value);
                }
            }
            this.setState({
                user_roles: roles,
            })
        } else {
            this.setState({
                [target.name]:target.value
            })
        }
    }

    render(){
        return(
            <div className="Create-User">
                <div className="heading">
                    Create New User
                </div>
                <form action="submit" className="create-user-form">
                    <div className="createuser-input">
                        <label htmlFor="first_name" >First Name</label>
                        <br/>
                        <input
                            type="text"
                            name="first_name"
                            required
                            onChange={this.handleChange}
                            value={this.state.first_name}
                            />

                    </div>
                    <div className="createuser-input" >
                        <label htmlFor="last_name">Last Name</label>
                        <br/>
                        <input
                            type="text"
                            name="last_name"
                            required
                            onChange={this.handleChange}
                            value={this.state.last_name}/>
                    </div>
                    <div className="createuser-input">
                        <label htmlFor="email">email</label>
                        <br/>
                        <input
                            type="email"
                            name="email"
                            required
                            onChange={this.handleChange}
                            value={this.state.email}/>
                    </div>
                    <div className="createuser-input">
                        <label htmlFor="password">Password</label>
                        <br/>
                        <input
                            type="password"
                            name="password"
                            required
                            onChange={this.handleChange}
                            value={this.state.password}/>
                    </div>
                    <div className="createuser-input">
                        <label htmlFor="conf_password">Confirm Password</label>
                        <br/>
                        <input
                            type="password"
                            name="conf_password"
                            required
                            onChange={this.handleChange}
                            value={this.state.conf_password}/>
                    </div>
                    <div className="createuser-input">
                        <label htmlFor="roles">User Roles</label>
                        <br/>
                        <select
                            name="user_roles"
                            multiple
                            required
                            onChange={this.handleChange}
                            value={this.state.user_roles}>
                            {this.roleOptions()}
                        </select>
                    </div>
                    <div className="buttons">
                        <button>Clear</button>
                        <button>Save</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateUser;