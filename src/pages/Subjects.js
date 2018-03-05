/**
 * Kajizuka - Subjects.js
 * Handwrote by CreativeGP (02/25/2018)
 * 
 * A component for the page shows Subjects list.
 */

import React from 'react'

import { dateFormat } from '../utils/DateFormat'
import Title from '../components/Title'

class EditSubjectModal extends React.Component {

    constructor (props) {
        super(props)
        this.state = { id: '' }

        this.changeId = this.changeId.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
    }

    changeId (id) {
        this.setState({ id: id })
    }

    componentDidUpdate () {
        this.props.onFinishRendering()
    }

    render () {
        if (this.state.id === '') return <div style={{display:'none'}}></div>
        let data = JSON.parse(localStorage.subjects)

        return (
            <div className="modal fade" id="editSubjectModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 id="editModal-title" className="modal-title">
                                Subject "{data[this.state.id].title}" を変更
                            </h4>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="htmlForm-group row">
                                    <label id="editModal-name" className="col-form-label" htmlFor="subject-name">名前</label>
                                    <input id="subject-name" className="form-control" name="" type="text" defaultValue={data[this.state.id].title}/>
                                </div>
                                <div className="form-group row">
                                    <label id="editModal-detail" className="col-form-label" htmlFor="subject-detail">詳細</label><br />
                                    <textarea id="subject-detail" rows="3" style={{width: "100%"}} className="htmlForm-control" defaultValue={data[this.state.id].detail} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e=> this.props.editSubjectHandler(this.state.id)}>変更</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class AddSubjectModal extends React.Component {

    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div className="modal fade" id="addSubjectModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">新しいSubjectを追加</h4>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="htmlForm-group row">
                                    <label className="col-form-label" htmlFor="subject-name">名前</label>
                                    <input id="subject-name" className="form-control" name="" type="text" defaultValue=""/>
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label" htmlFor="subject-detail">詳細</label><br />
                                    <textarea id="subject-detail" rows="3" style={{width: "100%"}} className="htmlForm-control" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.addSubjectHandler}>追加</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class DeleteSubjectModal extends React.Component {

    constructor (props) {
        super(props)
        this.state = { id: '' }

        this.changeId = this.changeId.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
    }

    changeId (id) {
        this.setState({ id: id })
    }

    componentDidUpdate () {
        this.props.onFinishRendering()
    }

    render () {
        if (this.state.id === '') return <div style={{display:'none'}}></div>
        let data = JSON.parse(localStorage.subjects)
        if (!(this.state.id in data)) return <div style={{display:'none'}}></div>

        return (
            <div className="modal fade" id="deleteSubjectModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 id="deleteModal-title" className="modal-title">
                                Subject "{data[this.state.id].title}" を削除
                            </h4>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e=> this.props.deleteSubjectHandler(this.state.id)}>削除</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class SubjectListItem extends React.Component {
    constructor (props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick () {
        
    }
    render () {
        return (
            <div id={'subject-card-'+this.props.subject.id} className="card w-50">
                <div className="card-body">
                    <h4 className="card-title">{this.props.subject.title}
                        <button className="btn btn-link float-right h1 text-dark" onClick={e=> this.props.onClickToEdit(this.props.subject)}
                                style={{
                                    position: "relative",
                                    bottom: "20px",
                                    textDecoration: "none",
                                    fontSize: "32px"
                                }}>*</button>
                    </h4>
                    <p className="card-text">
                        {this.props.subject.detail}
                    </p>

                    <a className="clickable text-muted float-left" onClick={e=> this.props.handleDelete(this.props.subject)}><small>削除</small></a>
                    <small className="text-muted float-right">
                        追加日：{dateFormat.format(new Date(this.props.subject.add), 'MM/dd/yyyy')}
                    </small>
                </div>
            </div>
        )
    }
}

export default class Subjects extends React.Component {

    constructor (props) {
        super(props)
        this.addSubject = this.addSubject.bind(this)
        this.editSubject = this.editSubject.bind(this)
    }

    showEditSubjectModal (card) {
        $("#editSubjectModal").modal('show')
    }

    showAddSubjectModal () {
        $("#addSubjectModal").modal('show')
    }

    showDeleteSubjectModal () {
        $("#deleteSubjectModal").modal('show')
    }

    addSubject () {
        let ID = () => {
            // Math.random should be unique because of its seeding algorithm.
            // Convert it to base 36 (numbers + letters), and grab the first 9 characters
            // after the decimal.
            return '_' + Math.random().toString(36).substr(2, 9)
        }        
        let data = JSON.parse(localStorage.subjects)
        let id = ID()
        data[id] = {
            id: id,
            title: $("#addSubjectModal #subject-name").val(),
            add: new Date(),
            detail: $("#addSubjectModal #subject-detail").val(),
        }
        localStorage.subjects = JSON.stringify(data)

        this.forceUpdate()
    }

    editSubject (id) {
        let data = JSON.parse(localStorage.subjects)
        data[id].title = $("#editSubjectModal #subject-name").val()
        data[id].mod = new Date()
        data[id].detail = $("#editSubjectModal #subject-detail").val()
        localStorage.subjects = JSON.stringify(data)

        this.forceUpdate()
    }

    deleteSubject (id) {
        let data = JSON.parse(localStorage.subjects)
        delete data[id]
        localStorage.subjects = JSON.stringify(data)

        this.forceUpdate()
    }

    render () {
        let hash_map = function (hash, proc) {
            let result = []
            for (let key in hash) {
                if (key === "map") continue
                result.push(proc(key, hash[key]))
            }
            return result
        }
        
        let hash_get_values = function (hash) {
            return hash_map(hash, (k, v) => v)
        }

        return (
            <div id="subject-temp">
                <Title pageName="Subjects" switchPageCallback={this.props.switchPageCallback}/>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h3 className="float-left">Subjects you have</h3>
                            <button id="Toggle_AddSubjectModal" type="button" className="float-right btn btn-success" onClick={this.showAddSubjectModal}>Subjectを追加</button>
                        </div>
                        {hash_get_values(JSON.parse(localStorage.subjects))
                            .sort((a, b) => (new Date(b.add))-(new Date(a.add)))
                            .map((subject)=> 
                                    <SubjectListItem key={subject.id} subject={subject} handleDelete={subject=> this.delete_subject_modal.changeId(subject.id)}
                                        onClickToEdit={subject=>{
                                            // ここでEditSubjectModalを操作して再描画させる、再描画先のコードが、、、
                                            this.edit_subject_modal.changeId(subject.id)
                                        }} 
                                         />
                                )}
                    </div>
                </div>

                <AddSubjectModal addSubjectHandler={this.addSubject}/>

                <EditSubjectModal onFinishRendering={/*ここになる*/()=> this.showEditSubjectModal()} editSubjectHandler={subject_id=> this.editSubject(subject_id)} ref={instance=> this.edit_subject_modal = instance} />
                
                <DeleteSubjectModal onFinishRendering={()=> this.showDeleteSubjectModal()} deleteSubjectHandler={subject_id=> this.deleteSubject(subject_id)} ref={instance=> this.delete_subject_modal = instance} />
            </div>
        )
    }
}
