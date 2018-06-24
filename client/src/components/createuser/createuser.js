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

    resetForm = () => {
        this.setState({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            conf_password: "",
            user_roles: [],
        });
    }

    handleClear = (event) => {
        event.preventDefault();
        this.resetForm();
    }

    handleSave = (event) => {
        event.preventDefault();
        const userForm = event.target.parentElement.parentElement;
        if(!userForm.checkValidity()){
            userForm.reportValidity();
        } else if (this.state.password !== this.state.conf_password){
            // document.getElementById("email").setCustomValidity("This email is already registered!");
            const confpswd = userForm.querySelector('input[name="conf_password"]');
            confpswd.setCustomValidity("Passwords must match");
            confpswd.reportValidity();
        } else {
            const newUser = {
                email: this.state.email,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                password: this.state.password,
                conf_password: this.state.conf_password,
                user_roles: this.state.user_roles,
            }

            fetch("/api/user/create", {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(newUser),
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
                this.resetForm();
            }).catch(err => {
                console.log(err)
            });
        }
    }


    handleChange = (event) => {
        const target = event.target;
        if(target.name === 'conf_password'){
            target.setCustomValidity("");
        }
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
        const state = this.state;
        const val_fname = (state.first_name) ? " hidden" : "";
        const val_lname = (state.last_name) ? " hidden" : "";
        const val_email = (state.email) ? " hidden" : "";
        const val_pswd = (state.password) ? " hidden" : "";
        const val_roles = (state.user_roles.length > 0) ? " hidden" : "";
        const val_conf = (state.conf_password === state.password) ? " hidden" : "";

        return(
            <div className="Create-User">
                <div className="heading">
                    Create New User
                </div>
                <form action="submit" className="create-user-form">
                    <div className="createuser-input">
                        <label htmlFor="first_name">first name
                            <span className={"tooltip-text" + val_fname}>*required</span>
                        </label>
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
                        <label htmlFor="last_name">last name
                            <span className={"tooltip-text" + val_lname}>*required</span>
                        </label>
                        <br/>
                        <input
                            type="text"
                            name="last_name"
                            required
                            onChange={this.handleChange}
                            value={this.state.last_name}/>
                    </div>
                    <div className="createuser-input">
                        <label htmlFor="email">email
                            <span className={"tooltip-text" + val_email}>*required</span>
                        </label>
                        <br/>
                        <input
                            type="email"
                            name="email"
                            required
                            onChange={this.handleChange}
                            value={this.state.email}/>
                    </div>
                    <div className="createuser-input">
                        <label htmlFor="password">password
                            <span className={"tooltip-text" + val_pswd}>*required</span>
                        </label>
                        <br/>
                        <input
                            type="password"
                            name="password"
                            required
                            onChange={this.handleChange}
                            value={this.state.password}/>
                    </div>
                    <div className="createuser-input">
                        <label htmlFor="conf_password">confirm password
                            <span className={"tooltip-text" + val_conf}>*passwords must match</span>
                        </label>
                        <br/>
                        <input
                            type="password"
                            name="conf_password"
                            required
                            onChange={this.handleChange}
                            value={this.state.conf_password}/>
                    </div>
                    <div className="createuser-input">
                        <label htmlFor="roles">User Roles
                            <span className={"tooltip-text" + val_roles}>*required</span>
                        </label>
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
                        <button onClick={this.handleClear}>Clear</button>
                        <button onClick={this.handleSave}>Save</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateUser;