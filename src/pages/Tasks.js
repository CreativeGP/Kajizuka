import React from 'react'
import Title from '../components/Title'

export default class Tasks extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div><Title switchPageCallback={this.props.switchPageCallback} pageName="Tasks" /></div>
        )
    }
}