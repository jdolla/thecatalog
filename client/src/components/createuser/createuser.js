import React, {Component} from 'react';
import './createuser.css'


class CreateUser extends Component{
    state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        conf_password: "",
        user_roles: []
    }

    render(){
        return(
            <div className="Create-User">
                <form action="submit" className="create-user-form">
                    <div className="createuser-input">
                        <label htmlFor="first_name">First Name</label>
                        <br/>
                        <input type="text" name="first_name"/>
                    </div>
                    <div className="createuser-input">
                        <label htmlFor="last_name">Last Name</label>
                        <br/>
                        <input type="text" name="last_name"/>
                    </div>
                    <div className="createuser-input">
                        <label htmlFor="email">email</label>
                        <br/>
                        <input type="text" name="email"/>
                    </div>
                    <div className="createuser-input">
                        <label htmlFor="password">Password</label>
                        <br/>
                        <input type="password" name="password"/>
                    </div>
                    <div className="createuser-input">
                        <label htmlFor="conf_password">Confirm Password</label>
                        <br/>
                        <input type="password" name="conf_password"/>
                    </div>
                    <div className="createuser-input">
                        <label htmlFor="roles">User Roles</label>
                        <br/>
                        <select name="roles" multiple>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateUser;