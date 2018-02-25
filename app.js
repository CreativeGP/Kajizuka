import React from 'react'
import ReactDOM from 'react-dom'
import Welcome from './src/pages/Welcome'
import Tasks from './src/pages/Tasks'

class App extends React.Component {

    constructor() {
        super()
        this.state = { page: <Welcome /> }
    }
    
    show(url) {
        switch(url) {
            case 'welcome': this.setState({ page: <Welcome /> })
            case 'tasks': this.setState({ page: <Tasks /> })
            default: this.setState({ page: <Tasks /> })
        }
        this.forceUpdate()
    }

    render () {
        return (
            <div>{this.state.page}</div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('page'))