/**
 * Kajizuka - Ideas.js
 * Handwrote by CreativeGP (02/25/2018)
 * 
 * A component for the page shows Ideas list.
 */

import React from 'react'

import { dateFormat } from '../utils/DateFormat'
import Title from '../components/Title'


export default class Ideas extends React.Component {

    constructor (props) {
        super(props)
    }
    

    render () {
        return (
            <div>
                <Title switchPageCallback={this.props.switchPageCallback} pageName="Ideas" />
            </div>
        )
    }
}
