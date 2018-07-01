import React, {Component} from 'react';
import './brandpicker.css';

import Select from 'react-select';

class BrandPicker extends Component{

    state = {
        selectedOption: '',
        options: [],
    }

    componentDidMount = () => {
        fetch('/api/brand', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache': 'no-cache'
            },
        }).then(data => {
            if (data.ok){
                return data.json();
            } else {
                throw Error(data.status)
            }
        }).then(data => {
            const options = data.map(option => {
                return {value: option.name, label: option.name};
            });

            this.setState({
                options
            })
        })
    }

    handleChange = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption || ""
        }, this.props.changeBrand(selectedOption.value));
    }

    render() {
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;

        return (
            <div>
                <Select name = "form-field-name"
                    value = {value}
                    onChange = {this.handleChange}
                    options = {this.state.options}
                />
            </div>
        );
    }

}

export default BrandPicker;


