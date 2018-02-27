/**
 * Kajizuka - Settings.js
 * Handwrote by CreativeGP (02/27/2018)
 * 
 * A component for the configuration page.
 */

import React from 'react'
import Title from '../components/Title'

/**
 * App - *
 * @class
 * @prop {Function} switchPageCallback - a page switching function that is a method of App class
*/
export default class Settings extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="content">
                <Title switchPageCallback={this.props.switchPageCallback} pageName="設定" />
                <div className="row">
                    <div className="col-sm-3" style={{ backgroundColor: "#ccc8" }}>
                        <ul>
                            <li><a href="#appearance">外見</a></li>
                            <li><a href="#user">ユーザー設定</a></li>
                            <li><a href="#storage">User Storage</a></li>
                            <button type="button" className="btn btn-primary" onClick={saveSettings}>設定を保存</button>
                        </ul>
                    </div>
                    <div className="col-sm-9">
                        <h3 id="appearance"># 外見</h3>
                        <p>背景色 : <input id="settings-background-color" name="" type="text" defaultValue={settings.backgroundColor}/></p>
                        <p>文字色 : <input id="settings-contrast-color" name="" type="text" defaultValue={settings.color}/></p>
                        <h3 id="user"># ユーザー設定</h3>
                        <p>ユーザー名 : <input id="settings-name" name="" type="text" defaultValue={settings.userName} /></p>
                        <p>パスワード : <input id="settings-password" name="" type="text" defaultValue={settings.userPassword} /></p>
                        <h3 id="storage"># User Storages</h3>
                        <p>KajizukaはwebStorageのlocalStorageを利用して静的なアプローチでサービスを提供しています。
                            <b>ストレージには上記の設定項目の内容やあなたのタスクなどアプリの情報が全て詰まっています。</b>
                            ストレージを削除するとあなたの情報は全て削除されるので注意してください。
                        </p>
                        <button type="button" className="btn btn-danger" onClick={clearStorage}>ストレージを削除する</button>
                    </div>
                </div>
            </div>
        )
    }
}