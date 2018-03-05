/**
 * Kajizuka - Tasks.js
 * Handwrote by CreativeGP (02/25/2018)
 * 
 * A component for the page shows Tasks list.
 */

import React from 'react'

import { dateFormat } from '../utils/DateFormat'
import Title from '../components/Title'


/**
 * 
 * @prop {Object} title 
 */
class TaskListItem extends React.Component {

    constructor (props) {
        super(props)

        this.state = { done: false }

        this.toggleDone = this.toggleDone.bind(this)
    }

    toggleDone () {
        this.setState({ done: !this.state.done })
    }

    render () {
        return (
            <li className={"list-group-item container " + (this.state.done?'done':'')}>
                <div className="row">
                <div className="col-sm-1">
                    <p className="clickable text-muted" onClick={e=> this.props.handleDelete(this.props.task)}>×</p>
                </div>
                <div className="col-sm-1">
                    <p className="clickable text-muted" onClick={e=> this.toggleDone()}>✓</p>
                </div>
                <div className="col-sm-10">
                    {this.props.task.title}
                    <small className="float-right text-muted">追加日：{dateFormat.format(new Date(this.props.task.add), 'MM/dd/yyyy')}</small>
                    {(()=>{
                        if (this.props.task.deadline)
                            return <p><small className="float-right text-muted">締め切り：{this.props.task.deadline}</small></p>
                    })()}
                </div>
                </div>
            </li>
        )
    }
}


/**
 * @class
 * @prop {Boolean} show Whether this is expected to be shown
 * @prop {Function} handleClose A handler to catch modal closing
 * @prop {Function} switchPageCallback - a page switching function that is a method of App class
*/
class AddTaskModal extends React.Component {

    constructor (props, context) {
        super(props, context)

        this.addTask = this.addTask.bind(this)
    }

    addTask () {
        let ID = () => {
            // Math.random should be unique because of its seeding algorithm.
            // Convert it to base 36 (numbers + letters), and grab the first 9 characters
            // after the decimal.
            return '_' + Math.random().toString(36).substr(2, 9)
        }
        let data = JSON.parse(localStorage.tasks)
        let id = ID()
        data[id] = {
            id: id,
            title: $("#task-name").val(),
            add: new Date(),
            deadline: $("#task-deadline").val().replace(/-/g, '/').substr(5) + "/" + $("#task-deadline").val().replace(/-/g, '/').substr(0, 4)
        }
        localStorage.tasks = JSON.stringify(data)
    
        this.props.switchPageCallback('tasks')  // redraw
    }
    
    render () {
        return (
            <div className="modal fade" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">新しいタスクを追加</h4>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="htmlForm-group row">
                                    <label className="col-form-label" htmlFor="task-name">タスク名</label>
                                    <input id="task-name" className="form-control" name="" type="text" defaultValue=""/>
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label" htmlFor="task-tags">タグ</label>
                                    <input id="task-tags" className="form-control" name="task-tags" type="text" defaultValue=""/>
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label" htmlFor="task-deadline">タスク締め切り</label>
                                    <input id="task-deadline" className="form-control" name="" type="date" defaultValue={dateFormat.format(new Date(), 'yyyy-MM-dd')}/>
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label" htmlFor="task-detail">タスク詳細</label><br />
                                    <textarea id="task-detail" rows="3" style={{width: "100%"}} className="htmlForm-control" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addTask}>追加</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


/**
 * @class
 * @prop {Boolean} show Whether this is expected to be shown
 * @prop {Function} handleClose A handler to catch modal closing
 * @prop {Function} onFinishRendering A handler to catch a time modal finish rendering 
 * @prop {Function} switchPageCallback - a page switching function that is a method of App class
*/
class DeleteTaskModal extends React.Component {

    constructor (props, context) {
        super(props, context)

        this.state = { id: '' }

        this.deleteTask = this.deleteTask.bind(this)
        this.changeId = this.changeId.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
    }

    changeId (id) {
        this.setState({ id: id })
    }

    componentDidUpdate () {
        this.props.onFinishRendering()
    }

    deleteTask (id) {
        let data = JSON.parse(localStorage.tasks)
        delete data[id]
        localStorage.tasks = JSON.stringify(data)
    
        this.props.switchPageCallback('tasks')  // redraw
    }
    
    render () {
        if (this.state.id === '') return <div style={{display:'none'}}></div>
        let data = JSON.parse(localStorage.tasks)
        if (!(this.state.id in data)) return <div style={{display:'none'}}></div>
        
        return (
            <div className="modal fade" id="deleteModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{data[this.state.id].title}を削除</h4>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e=> this.deleteTask(this.state.id)}>削除</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


/**
 * @class
 * @prop {Function} switchPageCallback - a page switching function that is a method of App class
*/
export default class Tasks extends React.Component {

    constructor(props) {
        super(props)

        this.showModal = this.showModal.bind(this)
        this.showDeleteModal = this.showDeleteModal.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        
        this.state = { isModalVisible: false }
    }

    showModal () {
        $('#myModal').modal('show')
    }

    showDeleteModal () {
        $('#deleteModal').modal('show')
    }

    handleModalClose () {
        $('#myModal').modal('hide')
    }

    render() {
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
            <div>
                <Title switchPageCallback={this.props.switchPageCallback} pageName="Tasks" />
                
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div id="task-list">
                                <div className="list-group">
                                    <li className="list-group-item active">
                                        <h3 className="float-left">Tasks you have to DO</h3>
                                        <button type="button" className="btn btn-success float-right" onClick={this.showModal}>新しいTaskを追加</button>
                                    </li>
                                    {hash_get_values(JSON.parse(localStorage.tasks))
                                        .sort((a, b) => (new Date(b.add))-(new Date(a.add)))
                                        .map((task)=> <TaskListItem key={task.id} task={task} handleDelete={task=> this.delete_task_modal.changeId(task.id)}/>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <AddTaskModal switchPageCallback={this.props.switchPageCallback} />
                <DeleteTaskModal switchPageCallback={this.props.switchPageCallback} onFinishRendering={()=> this.showDeleteModal()} ref={instance=> this.delete_task_modal = instance} />
            </div>
        )
    }
}