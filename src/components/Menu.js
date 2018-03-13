/**
 * Kajizuka - Menu.js
 * Handwrote by CreativeGP (02/26/2018)
 */

import React from 'react'

/** 
 * Title - *
 * @class
 * @prop {Object} style - a react.js style object
*/
export default class Menu extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        // 必要なスタイルとpropsを使って渡されたスタイルを融合
        let my_style = Object.assign(this.props.style, { margin: "none", borderBottom: "2px solid black" })

        return (  
            // TODO: react-bootstrapを使ってみてもいいかも
            <div id="menu" style={my_style} className="col-sm-12 hidden-sm-down">
                {/* <button type="button" className="btn btn-link" onClick={e=> this.props.switchPageCallback('timeline')}>Timeline</button> */}
                <button type="button" className="btn btn-link" onClick={e=> this.props.switchPageCallback('tasks')}>Tasks</button>
                <button type="button" className="btn btn-link" onClick={e=> this.props.switchPageCallback('subjects')}>Subjects</button>
                <button type="button" className="btn btn-link" onClick={e=> this.props.switchPageCallback('ideas')}>Ideas</button>
                <button type="button" className="btn btn-link" onClick={e=> this.props.switchPageCallback('settings')}>設定</button>
            </div>
        )
    }
}