/**
 * Kajizuka - Ideas.js
 * Handwrote by CreativeGP (02/25/2018)
 * 
 * A component for the page shows Ideas list.
 */

import React from 'react'

import { dateFormat } from '../utils/DateFormat'
import Title from '../components/Title'

let ID = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9)
}


class IdeaCategory extends React.Component {

    constructor (props) {
        super(props)

        this.addNewItem = this.addNewItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    addNewItem () {
        let data = JSON.parse(localStorage.ideas)
        let id = ID()
        data[this.props.category_id].content[id] = 'New item'
        localStorage.ideas = JSON.stringify(data)

        this.forceUpdate()
    }

    deleteItem (id) {
        let data = JSON.parse(localStorage.ideas)
        delete data[this.props.category_id].content[id]
        localStorage.ideas = JSON.stringify(data)

        this.forceUpdate()
    }

    componentDidMount () {
        let data = JSON.parse(localStorage.ideas)
        let titles = document.querySelectorAll(".content")
        Array.prototype.map.call(titles, elm => {
            elm.addEventListener('input', e => {
                let item_id = e.target.id.substr(0, 10)
                data[this.props.category_id].content[item_id] = e.target.innerText
                localStorage.ideas = JSON.stringify(data)
            })
        })

        document.getElementById(this.props.category_id+"_title").addEventListener('input', e => {
            data[this.props.category_id].title = e.target.innerText
            localStorage.ideas = JSON.stringify(data)
        })
    }

    render () {
        let content = []
        let data = JSON.parse(localStorage.ideas)

        for (let key in data[this.props.category_id].content) {
            content.push(
                <div className="list-group-item">
                    <div className="float-right text-muted text-center align-middle clickable" onClick={e=> this.deleteItem(key)}>×</div>
                    <div className="content" id={key+"_content"} style={{padding: '10px 0px'}} contentEditable>{data[this.props.category_id].content[key]}</div>
                </div>
            )
        }

        return (
            <div className="col-md-4 col-sm-6">
                <lead id={this.props.category_id+"_title"} contentEditable>{data[this.props.category_id].title}</lead>
                <ul className="list-group">
                    {content}
                    <li className="list-group-item list-group-item-action clickable" onClick={this.addNewItem}>新しい項目を追加</li>
                </ul>
            </div>
        )
    }
} 


export default class Ideas extends React.Component {

    constructor (props) {
        super(props)

        this.addCategory = this.addCategory.bind(this)
    }


    addCategory () {
        let data = JSON.parse(localStorage.ideas)
        let id = ID()
        data[id] = {
            title: 'New category',
            content: {}
        }
        localStorage.ideas = JSON.stringify(data)

        // ステートを直接変更するわけではないので自動描画されないので関数を呼んで再描画
        this.forceUpdate();
    }
    

    render () {
        let content = []

        for (let key in JSON.parse(localStorage.ideas)) {
            content.push(<IdeaCategory category_id={key} key={key} />)
        }

        return (
            <div>
                <Title switchPageCallback={this.props.switchPageCallback} pageName="Ideas" />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h3 className="float-left">あなたのIdea（やりたいこと・目標・メモ）</h3>
                            <button type="button" className='btn btn-success float-right' onClick={this.addCategory}>新たなカテゴリを追加</button>
                        </div>
                    </div>

                    <div className="row">
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}
