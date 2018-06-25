import React, {Component} from 'react';
import './modifyuser.css'


class ModifyUser extends Component{

    constructor(){
        super();


        /**************
         * Random Password Chars
         **************/
        let chars = [];
        for (let i = 65; i < 91; i++) {
            chars.push(String.fromCharCode(i))
        }
        for (let i = 97; i < 123; i++){
            chars.push(String.fromCharCode(i))
        }
        for (let i = 48; i < 58; i++){
            chars.push(String.fromCharCode(i))
        }
        chars.push(String.fromCharCode(33))
        chars.push(String.fromCharCode(35))
        chars.push(String.fromCharCode(63))
        chars.push(String.fromCharCode(94))

        this.state = {
            user_roles: [],
            passChars: chars,
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.userdata !== this.props.userdata){
            this.setState({
                user_roles: this.props.userdata.user_roles,
            })
        }
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
        }
    }

    handleSaveRoles = (event) => {
        event.preventDefault();
        const usrForm = event.target.parentElement.parentElement;
        if(!usrForm.checkValidity()){
            usrForm.reportValidity();
        }

    }

    handleStatusChange = (event) => {
        const userdata = this.props.userdata;
        const operation = (userdata.status === 'active') ? 'deactivate' : 'activate';
        fetch(`/api/user/${operation}/${this.props.userdata._id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache': 'no-cache'
              },
        }).then(resp => {
            if(!resp.ok){
                throw Error(`${resp.status} ${resp.statusText}`)
            }
            this.props.refreshUserList();
        }).catch(err => {
            console.log(err);
        })
    }

    randBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    getRandomPassword = () => {
        let password = [];
        const passChars = this.state.passChars;
        for (let i = 0; i < 20; i++) {
            password.push(passChars[this.randBetween(0, passChars.length)]);
        }
        alert(password.join(''));
        return null;
    }

    handlResetPassword = () => {
        this.getRandomPassword();
    }

    render(){

        const btnRoleClass = (this.props.mode === 'view') ? " hidden" : "";

        const selOpts = {};
        selOpts['multiple'] = 'multiple';
        if(this.props.mode === 'view'){
            selOpts['disabled'] = 'disabled';
        }

        const roles = this.props.user_roles;
        const userdata = this.props.userdata;

        if(!userdata){
            return (
                <div className="Modify-User">
                    <div className="nodata">
                        Select a user
                    </div>
                </div>
            )
        };

        const actBtn = (userdata.status === 'active') ? 'Deactivate' : 'Activate';
        const fname = userdata.first_name;
        const lname = userdata.last_name;
        return(
            <div className="Modify-User">
            <div className="heading">
                <div className="current-user">
                    {`${fname} ${lname}`}
                </div>
            </div>
            <form action="submit" className="modify-user-form">
            <div className="modify-input">
                    <div className="label">created on:</div>
                    <span className="value">{userdata.createdAt}</span>

                </div>
                <div className="modify-input">
                    <div className="label">current status:</div>
                    <span className="value">{userdata.status}</span>
                </div>
                <div className="modify-input">
                    <div className="label">user roles:</div>
                    <select name="user_roles" {...selOpts}
                        value={this.state.user_roles}
                        onChange={this.handleChange}
                        required>
                        {
                            roles.map((role, i) => {
                                return (
                                    <option key={i}
                                        value={role}>{role}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <button
                        className={"save-roles" + btnRoleClass}
                        onClick={this.handleSaveRoles}>
                        Save Roles
                    </button>
                </div>
            </form>

                <div className="buttons">
                    <button onClick={this.handleStatusChange}>{actBtn}</button>
                    <button onClick={this.handlResetPassword}>Reset Password</button>
                </div>
            </div>
        )
    }
}

export default ModifyUser;