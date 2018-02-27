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

    constructor() {
        this.save = this.save.bind(this)
    }

    /** 
     * @function save Saves user settings to the localStorage.
     * Note that this function won't work correctly without Settings page.
    */
    save () {
        // めんどくさいのでJQueryで横着
        // TODO: 余力があれば面倒だけどReact風にうまくformを実装するのもいいかも
        this.backgroundColor = $('#settings-background-color').val();
        this.color = $('#settings-contrast-color').val();
        this.userName = $('#settings-name').val();
        this.userPassword = $('#settings-password').val();

        localStorage.setItem('settings-background-color', this.backgroundColor);
        localStorage.setItem('settings-color', this.color);
        localStorage.setItem('settings-name', this.userName);
        localStorage.setItem('settings-password', this.userPassword);

        $("#page").css('background-color', this.backgroundColor);
        $("#page").css('color', this.color);
    }
}