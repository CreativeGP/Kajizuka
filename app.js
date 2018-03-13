import React from 'react'
import ReactDOM from 'react-dom'
import Welcome from './src/pages/Welcome'
import Tasks from './src/pages/Tasks'
import Subjects from './src/pages/Subjects'
import Ideas from './src/pages/Ideas'
import Settings from './src/pages/Settings'
import Configure from './src/utils/Configure'

class App extends React.Component {

    constructor() {
        super()

        this.state = { page: '' }
        this.show = this.show.bind(this)
        this.setDisplayItem = this.setDisplayItem.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)

        this.settings = new Configure() // localStorageの内容をロード（初めて訪れる場合はデフォルト値をロード）

        let check_local_storage = () => {
            // JSONとして読み込む変数はカラリストで初期化しておかないとエラる
            if (!localStorage.tasks) localStorage.tasks = '{}';
            if (!localStorage.subjects) localStorage.subjects = '{}';
            if (!localStorage.ideas) localStorage.ideas = '{}';
        }
        check_local_storage()
    }

    componentDidMount () {
        if (!localStorage.visited) {
            // 初めて訪れる場合
            this.show('welcome')

            localStorage.visited = true
        } else {
            this.show(localStorage.scene)
        }
    }

    setDisplayItem(value) {
        localStorage.setItem('scene', value)
    }

    show(url) {
        this.setDisplayItem(url)
        switch(url) {
            case 'welcome':
            this.setState({ page: <Welcome switchPageCallback={e=> this.show(e)} /> })
            break
            case 'settings':
            this.setState({ page: <Settings settings={this.settings} switchPageCallback={e=> this.show(e)} /> })
            break
            case 'tasks':
            this.setState({ page: <Tasks switchPageCallback={e=> this.show(e)} /> })
            break
            case 'subjects':
            this.setState({ page: <Subjects switchPageCallback={e=> this.show(e)} /> })
            break
            case 'ideas':
            this.setState({ page: <Ideas switchPageCallback={e=> this.show(e)} /> })
            break
            default: this.setState({ page: <subjects switchPageCallback={e=> this.show(e)} /> })
        }
    }

    render () {
        return (
            <div>{this.state.page}</div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('page'))
