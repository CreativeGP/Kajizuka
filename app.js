import React from 'react'
import ReactDOM from 'react-dom'
import Welcome from './src/pages/Welcome'
import Tasks from './src/pages/Tasks'

class App extends React.Component {

    constructor() {
        super()
        this.state = { page: <Welcome switchPageCallback={e=> this.show(e)} /> }
    }

    setDisplayItem(value) {
        localStorage.setItem('scene', value)
    }

    show(url) {
        this.setDisplayItem(url)
        switch(url) {
            case 'welcome': this.setState({ page: <Welcome switchPageCallback={e=> this.show(e)} /> })
            break
            case 'tasks': this.setState({ page: <Tasks switchPageCallback={e=> this.show(e)} /> })
            break
            default: this.setState({ page: <Tasks switchPageCallback={e=> this.show(e)} /> })
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
