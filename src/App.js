import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
    state = {
        advice: "",
        loading: false // New state for loading indication
    };

    componentDidMount() {
        this.fetchAdvice();
    }

    fetchAdvice = () => {
        this.setState({ loading: true }); // Set loading to true when fetch starts
        axios.get('https://api.adviceslip.com/advice')
            .then((response) => {
                const { advice } = response.data.slip;
                this.setState({ advice, loading: false }); // Set loading to false when fetch is done
            })
            .catch((error) => {
                console.log(error);
                this.setState({ loading: false }); // Handle loading state on error
            });
    }

    render() {
        const { advice, loading } = this.state; // Destructure loading state

        return (
            <div className='app'>
                <div className='card'>
                    <h1 className='heading'>{advice}</h1>
                    <button
                        className={`button ${loading ? 'loading' : ''}`}
                        onClick={this.fetchAdvice}
                        disabled={loading} // Disable button when loading
                    >
                        <span>{loading ? 'Loading...' : 'GIVE ME ADVICE!'}</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
