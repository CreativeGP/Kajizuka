/**
 * Kajizuka - Tile.js
 * Handwrote by CreativeGP (02/26/2018)
 * 
 * A component for the header of every pages.
 */

import React from 'react'
import PropTypes from 'prop-types'

import Menu from './Menu'

/** 
 * Settings,Tasks,Timeline,Ideas,Subjects -> * -> Menu
 * @class
 * @prop {Function} switchPageCallback - a page switching function that is a method of App class
 * @prop {String} pageName - a string which is shown in header
 * @state {Boolean} show_menu - whether the Menu is visible
*/
export default class Title extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            show_menu: true
        }

        this.toggleMenu = this.toggleMenu.bind(this)
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