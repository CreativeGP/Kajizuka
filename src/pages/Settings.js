/**
 * Kajizuka - Settings.js
 * Handwrote by CreativeGP (02/27/2018)
 * 
 * A component for the configuration page.
 */

 import React from 'react'

export default class Settings extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Title switchPageCallback={this.props.switchPageCallback} pageName="設定" />
            </div>
            )
    }
}