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
const TaskListItem = props => {
    return (
        <li className="list-group-item">
            {props.task.title}
            <small className="float-right text-muted">追加日：{dateFormat.format(new Date(props.task.add), 'MM/dd/yyyy')}</small>
            {(()=>{
                 if (props.task.deadline)
                     return <p><small className="float-right text-muted">締め切り：{props.task.deadline}</small></p>
            })()}
        </li>
    )
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
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
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
 * @prop {Function} switchPageCallback - a page switching function that is a method of App class
*/
export default class Tasks extends React.Component {

    constructor(props) {
        super(props)

        this.showModal = this.showModal.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        
        this.state = { isModalVisible: false }
    }

    showModal () {
        $('#myModal').modal('show')
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
                                        .map((task)=> <TaskListItem key={task.id} task={task} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AddTaskModal />
            </div>
        )
    }
}