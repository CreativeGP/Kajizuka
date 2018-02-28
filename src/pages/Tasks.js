/**
 * Kajizuka - Tasks.js
 * Handwrote by CreativeGP (02/25/2018)
 * 
 * A component for the page shows Tasks list.
 */

import React from 'react'
import { Modal, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import Title from '../components/Title'

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


class AddTaskModal extends React.Component {

    constructor (props, context) {
        super(props, context)

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        
        this.state = {
            show: this.props.show
        }
    }

    handleShow () {
        this.setState({ show: true })
    }

    handleClose () {
        this.props.handleClose()
        this.setState({ show: false })
    }
    
    render () {
        return (
            <Modal show={this.state.show} onHide={this.handleClose} id="myModal">
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>新しいタスクを追加</Modal.Title>
                        <button type="button" className="close" data-dismiss="modal">&times</button>
                    </Modal.Header>

                    <Modal.Body>
                        <form>
                            <FormGroup controlId="formTaskName">
                                <ControlLabel>タスク名</ControlLabel>
                                <FormControl id="task-name" type="text" defaultValue=""/>
                            </FormGroup>
                            <FormGroup controlId="formTags">
                                <ControlLabel>タグ</ControlLabel>
                                <FormControl id="task-tags" type="text" defaultValue=""/>
                            </FormGroup>
                            <FormGroup controlId="formDeadline">
                                <ControlLabel>タスク締め切り</ControlLabel>
                                <FormControl id="task-deadline" type="date" defaultValue={dateFormat.format(new Date(), 'yyyy-MM-dd')}/>
                            </FormGroup>
                            <FormGroup controlId="formDetail">
                                <ControlLabel>タスク詳細</ControlLabel>
                                <textarea id="task-detail" rows="3" style={{width: "100%"}} className="htmlForm-control" />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="secondary" data-dismiss="modal">Close</Button>
                        <Button bsStyle="primary" data-dismiss="modal">追加</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        )
    }
}

const add_task = () => {
    let data = JSON.parse(localStorage.tasks)
    let id = ID()
    data[id] = {
        id: id,
        title: $("#task-name").val(),
        add: new Date(),
        deadline: $("#task-deadline").val().replace(/-/g, '/').substr(5) + "/" + $("#task-deadline").val().replace(/-/g, '/').substr(0, 4)
    }
    localStorage.tasks = JSON.stringify(data)

    tasks()  // redraw
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
        this.setState({
            isModalVisible: true
        })
    }

    handleModalClose () {
        this.setState({
            isModalVisible: false
        })
    }

    render() {
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
                                        <Button bsStyle="success" className="float-right" onClick={this.showModal} />
                                    </li>
                                    {hash_get_values(JSON.parse(localStorage.tasks))
                                        .sort((a, b) => (new Date(b.add))-(new Date(a.add)))
                                        .map((task)=> <TaskListItem key={task.id} task={task} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <AddTaskModal handleClose={this.handleModalClose} show={this.state.isModalVisible} />
            </div>
        )
    }
}