/**
 * Kajizuka - Configure.js
 * Handwrote by CreativeGP (02/27/2018)
 * 
 * A class to store user configures.
 */

import React from 'react'
import Title from '../components/Title'

/**
 * @class A class to store user configures
*/
export default class Configure {

    backgroundColor = '#fff'
    color = '#212529'
    userName = ''
    userPassword = ''

    constructor() {
        this.save = this.save.bind(this)
        this.load = this.load.bind(this)
        this.clear = this.clear.bind(this)

        this.load()
    }

    /** 
     * @function save Saves user settings to the localStorage.
     * Note that this function won't work correctly without Settings page.
    */
    save () {
        // めんどくさいのでJQueryで横着
        // TODO: 余力があれば面倒だけどReact風にうまくformを実装するのもいいかも
        this.backgroundColor = $('#settings-background-color').val()
        this.color = $('#settings-contrast-color').val()
        this.userName = $('#settings-name').val()
        this.userPassword = $('#settings-password').val()

        localStorage.setItem('settings-background-color', this.backgroundColor)
        localStorage.setItem('settings-color', this.color)
        localStorage.setItem('settings-name', this.userName)
        localStorage.setItem('settings-password', this.userPassword)

        $("#page").css('background-color', this.backgroundColor)
        $("#page").css('color', this.color)
    }


    /**
     * @function load Loads user settings from the localStorage.
     */
    load () {
        let applyDefault = (value, def) => (value) ? value : def

        this.backgroundColor = applyDefault(localStorage.getItem('settings-background-color'), '#fff')
        this.color = applyDefault(localStorage.getItem('settings-color'), '#212529')
        this.userName = applyDefault(localStorage.getItem('settings-name'), '')
        this.userPassword = applyDefault(localStorage.getItem('settings-password'), '')

        $('#page').css('background-color', this.backgroundColor)
        $('#page').css('color', this.color)
    }


    /**
     * @function clear Clears user settings.
     * @argument {Function} welcome A function to show welcome page
     */
    clear (welcome) {
        // Clear user settings
        localStorage.clear()

        // Set default values
        this.load()

        // Show welcome page
        welcome()
    }
}