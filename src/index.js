import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component{
    getText = () => {
        return "hello world!";
    }

    render(){
        return (
            <h1>{this.getText()}</h1>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);