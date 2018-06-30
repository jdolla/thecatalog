import React, {Component} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './brandpicker.css';

class BrandPicker extends Component{

    state = {
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
                return {value: option.name, label: option.name}
            });

            this.setState({
                options
            })
        })
    }

    handleChange = (selectedOption) => {
        this.props.selectedBrand = selectedOption;
    }

    render() {
        const { selectedOption } = this.props.selectedBrand;

        return (
            <div className="BrandPicker-Box">
                <Select
                    name="brand"
                    value={selectedOption}
                    onChange={this.handleChange}
                    options= {this.state.options}
                />
            </div>
        );
      }
}

export default BrandPicker;

