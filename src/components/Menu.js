import React from 'react'

export default class Menu extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            // TODO: react-bootstrapを使ってみてもいいかも
            <div id="menu" className="col-sm-12 hidden-sm-down" style={{ margin: "none", borderBottom: "2px solid black" }}>
                <button type="button" className="btn btn-link" onClick={e=> this.props.switchPageCallback('timeline')}>Timeline</button>
                <button type="button" className="btn btn-link" onClick={e=> this.props.switchPageCallback('tasks')}>Tasks</button>
                <button type="button" className="btn btn-link" onClick={e=> this.props.switchPageCallback('subjects')}>Subjects</button>
                <button type="button" className="btn btn-link" onClick={e=> this.props.switchPageCallback('ideas')}>Ideas</button>
                <button type="button" className="btn btn-link" onClick={e=> this.props.switchPageCallback('settings')}>設定</button>
            </div>
        )
    }
}