import React from 'react'
import PropTypes from 'prop-types'

import Menu from './Menu'

export default class Title extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            show_menu: true
        }
    }

    toggleMenu () {
        this.setState({
            show_menu: !this.state.show_menu
        })
    }

    render () {
        return (
            <div className="row">
                <div className="col-sm-12" style={{ margin: "none", borderBottom: "2px solid black" }}>
                    <a className="float-left">
                        <h2>
                            <img id="logo" alt="" src="/logo/kajizuka.png" width="64" height="64" />
                            Kajizuka | {this.props.pageName}
                        </h2>
                    </a>
                    <button type="button" className="float-right btn btn-link" onClick={this.toggleMenu}>MENU</button>
                </div>
                <Menu switchPageCallback={this.props.switchPageCallback} style={{display: this.state.show_menu ? 'block' : 'none'}} />
            </div>
        );
    }
}

Title.propTypes = {
    pageName: PropTypes.string.isRequired,
    switchPageCallback: PropTypes.func.isRequired
}