import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { passwords: [] }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }
  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => {
        console.log(passwords)
        this.setState({ passwords })
      });
  }

  render() {
    const { passwords } = this.state;
    return (
      <div className="App">
        {passwords.map((p, i) => {
          return (
            <div key={i}>{p.password}</div>
          )
        })}
      </div>
    );
  }
}

export default App;
