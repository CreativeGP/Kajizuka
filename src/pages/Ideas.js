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

class IdeaItem extends React.Component {

    constructor (props) {
        super (props)

        this.state = {
            textValue: this.props.textValue
        }

        this.save = this.save.bind(this)
    }

    save (e) {
        let data = JSON.parse(localStorage.ideas)        
        data[this.props.category_id].content[this.props.id] = e.target.innerText;
        localStorage.ideas = JSON.stringify(data)

        // this.setState({
        //     textValue: e.target.innerText
        // })
    }

    render () {
        return (
            <div className="list-group-item">
                <div className="float-right text-muted text-center align-middle clickable" onClick={e=> this.props.deleteItemHandler(this.props.id)}>×</div>
                <div className="content" id={this.props.id+"_content"} style={{padding: '10px 0px'}} onInput={this.save} contentEditable>{this.state.textValue}</div>
            </div>
        )
    }
}


class IdeaCategory extends React.Component {

    constructor (props) {
        super(props)

        this.addNewItem = this.addNewItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
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

    componentDidUpdate () {        
        document.getElementById(this.props.category_id+"_title").addEventListener('input', e => {
            let data = JSON.parse(localStorage.ideas)
            data[this.props.category_id].title = e.target.innerText
            localStorage.ideas = JSON.stringify(data)
        })
    }

    render () {
        let content = []
        let data = JSON.parse(localStorage.ideas)

        for (let key in data[this.props.category_id].content) {
            content.push(
                <IdeaItem id={key} category_id={this.props.category_id} deleteItemHandler={id=> this.deleteItem(id)} textValue={data[this.props.category_id].content[key]}/>
            )
        }

        return (
            <div className="col-xl-4 col-lg-6" style={{marginTop: '30px'}}>
                <a className="float-right text-muted clickable" onClick={e=> this.props.deleteCategoryHandler(this.props.category_id)}>削除</a> 
                <h4 id={this.props.category_id+"_title"} contentEditable><strong>{data[this.props.category_id].title}</strong></h4>
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

        this.deleteCategory = this.deleteCategory.bind(this)
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

    deleteCategory (id) {
        let data = JSON.parse(localStorage.ideas)
        delete data[id]
        localStorage.ideas = JSON.stringify(data)

        this.forceUpdate()
    }
    

    render () {
        let content = []

        for (let key in JSON.parse(localStorage.ideas)) {
            content.push(<IdeaCategory category_id={key} key={key} deleteCategoryHandler={this.deleteCategory}/>)
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
