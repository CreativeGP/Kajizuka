'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var settings = {
    backgroundColor: '#ffffff',
    color: '#212529',
    userPassword: '',
    userName: ''
};

var dateFormat = {
    fmt: {
        "yyyy": function yyyy(date) {
            return date.getFullYear() + '';
        },
        "MM": function MM(date) {
            return ('0' + (date.getMonth() + 1)).slice(-2);
        },
        "dd": function dd(date) {
            return ('0' + date.getDate()).slice(-2);
        },
        "hh": function hh(date) {
            return ('0' + date.getHours()).slice(-2);
        },
        "mm": function mm(date) {
            return ('0' + date.getMinutes()).slice(-2);
        },
        "ss": function ss(date) {
            return ('0' + date.getSeconds()).slice(-2);
        }
    },
    format: function dateFormat(date, format) {
        var result = format;
        for (var key in this.fmt) {
            result = result.replace(key, this.fmt[key](date));
        }return result;
    }
};

function ID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

var hash_map = function hash_map(hash, proc) {
    var result = [];
    for (var key in hash) {
        if (key === "map") continue;
        result.push(proc(key, hash[key]));
    }
    return result;
};

var hash_get_values = function hash_get_values(hash) {
    return hash_map(hash, function (k, v) {
        return v;
    });
};

var hash_get_keys = function hash_get_keys(hash) {
    return hash_map(hash, function (k, v) {
        return k;
    });
};

$(document).ready(function () {
    var check_local_storage = function check_local_storage() {
        // JSONとして読み込む変数はカラリストで初期化しておかないとエラる
        if (!localStorage.tasks) localStorage.tasks = '{}';
        if (!localStorage.subjects) localStorage.subjects = '{}';
    };

    loadSettings();
    check_local_storage();

    // Check user's storage
    if (!localStorage.visited) {
        // If it is new user, show setting.
        welcome();
        localStorage.visited = true;
    } else {
        switch (localStorage.scene) {
            case 'timeline':
                timeline();break;
            case 'setting':
                setting();break;
            case 'tasks':
                tasks();break;
            case 'subjects':
                subjects();break;
            case 'ideas':
                ideas();break;
        }
    }
});

var setDisplayItem = function setDisplayItem(value) {
    return localStorage.setItem('scene', value);
};
var applyDefault = function applyDefault(value, def) {
    return value ? value : def;
};

var apply = function apply(react) {
    var page = document.getElementById('page');
    ReactDOM.render(react, page);
};

var app_template = function app_template() {
    tasks();
};

var clearStorage = function clearStorage() {
    localStorage.clear();
    loadSettings();
    welcome();
};

var loadSettings = function loadSettings() {
    settings.backgroundColor = applyDefault(localStorage.getItem('settings-background-color'), '#fff');
    settings.color = applyDefault(localStorage.getItem('settings-color'), "#212529");
    settings.userName = applyDefault(localStorage.getItem('settings-name'), "");
    settings.userPassword = applyDefault(localStorage.getItem('settings-password'), "");

    $("#page").css('background-color', settings.backgroundColor);
    $("#page").css('color', settings.color);
};

var saveSettings = function saveSettings() {
    settings.backgroundColor = $('#settings-background-color').val();
    settings.color = $('#settings-contrast-color').val();
    settings.userName = $('#settings-name').val();
    settings.userPassword = $('#settings-password').val();

    localStorage.setItem('settings-background-color', settings.backgroundColor);
    localStorage.setItem('settings-color', settings.color);
    localStorage.setItem('settings-name', settings.userName);
    localStorage.setItem('settings-password', settings.userPassword);

    $("#page").css('background-color', settings.backgroundColor);
    $("#page").css('color', settings.color);
};

var dropdown_menu = function dropdown_menu() {
    if ($('#menu').css('display') == 'block') {
        $('#menu').css('display', 'none');
    } else {
        $('#menu').css('display', 'block');
    }
};

/* ////////////////////////////////////////////////////////////////////////////////////////////////

   Components

 */ ////////////////////////////////////////////////////////////////////////////////////////////////

var Title = React.createClass({
    displayName: 'Title',

    propTypes: {
        pageName: React.PropTypes.string.isRequired
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-12', style: { margin: "none", borderBottom: "2px solid black" } },
                React.createElement(
                    'a',
                    { className: 'float-left' },
                    React.createElement(
                        'h2',
                        null,
                        React.createElement('img', { id: 'logo', alt: '', src: '/logo/kajizuka.png', width: '64', height: '64' }),
                        'Kajizuka | ',
                        this.props.pageName
                    )
                ),
                React.createElement(
                    'button',
                    { type: 'button', className: 'float-right btn btn-link', onClick: dropdown_menu },
                    'MENU'
                )
            )
        );
    }
});

var Menu = React.createClass({
    displayName: 'Menu',

    render: function render() {
        return React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { id: 'menu', className: 'col-sm-12 hidden-sm-down', style: { margin: "none", borderBottom: "2px solid black" } },
                React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-link', onClick: timeline },
                    'Timeline'
                ),
                React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-link', onClick: tasks },
                    'Tasks'
                ),
                React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-link', onClick: subjects },
                    'Subjects'
                ),
                React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-link', onClick: ideas },
                    'Ideas'
                ),
                React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-link', onClick: setting },
                    '\u8A2D\u5B9A'
                )
            )
        );
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////


var timeline = function timeline() {
    setDisplayItem('timeline');
};

var ideas = function ideas() {
    setDisplayItem('ideas');
};

var subjects = function subjects() {
    setDisplayItem('subjects');

    var show_edit_subject_modal = function show_edit_subject_modal(card) {
        $("#editModal").modal('show');
        //        $("#editModal-title").html(
    };

    var SubjectListItem = function (_React$Component) {
        _inherits(SubjectListItem, _React$Component);

        function SubjectListItem(props) {
            _classCallCheck(this, SubjectListItem);

            return _possibleConstructorReturn(this, (SubjectListItem.__proto__ || Object.getPrototypeOf(SubjectListItem)).call(this, props));
        }

        _createClass(SubjectListItem, [{
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    { className: 'card w-50' },
                    React.createElement(
                        'div',
                        { className: 'card-body' },
                        React.createElement(
                            'h4',
                            { className: 'card-title' },
                            this.props.subject.title,
                            React.createElement(
                                'button',
                                { className: 'btn btn-link float-right h1 text-dark', onClick: show_edit_subject_modal(this.props.subject),
                                    style: {
                                        position: "relative",
                                        bottom: "20px",
                                        textDecoration: "none",
                                        fontSize: "32px"
                                    } },
                                '*'
                            )
                        ),
                        React.createElement(
                            'p',
                            { className: 'card-text' },
                            this.props.subject.detail
                        ),
                        React.createElement(
                            'small',
                            { className: 'text-muted float-right' },
                            '\u8FFD\u52A0\u65E5\uFF1A',
                            dateFormat.format(new Date(this.props.subject.add), 'MM/dd/yyyy')
                        )
                    )
                );
            }
        }]);

        return SubjectListItem;
    }(React.Component);

    ;

    var EditModal = function (_React$Component2) {
        _inherits(EditModal, _React$Component2);

        function EditModal() {
            _classCallCheck(this, EditModal);

            var _this2 = _possibleConstructorReturn(this, (EditModal.__proto__ || Object.getPrototypeOf(EditModal)).call(this));

            _this2.state = { id: '' };
            return _this2;
        }

        _createClass(EditModal, [{
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    { className: 'modal fade', id: 'editModal' },
                    React.createElement(
                        'div',
                        { className: 'modal-dialog' },
                        React.createElement(
                            'div',
                            { className: 'modal-content' },
                            React.createElement(
                                'div',
                                { className: 'modal-header' },
                                React.createElement(
                                    'h4',
                                    { id: 'editModal-title', className: 'modal-title' },
                                    'Subject "',
                                    localStorage.subjects[this.state.id].title,
                                    '" \u3092\u5909\u66F4'
                                ),
                                React.createElement(
                                    'button',
                                    { type: 'button', className: 'close', 'data-dismiss': 'modal' },
                                    '\xD7'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'modal-body' },
                                React.createElement(
                                    'form',
                                    null,
                                    React.createElement(
                                        'div',
                                        { className: 'htmlForm-group row' },
                                        React.createElement(
                                            'label',
                                            { id: 'editModal-name', className: 'col-form-label', htmlFor: 'subject-name' },
                                            '\u540D\u524D'
                                        ),
                                        React.createElement('input', { id: 'subject-name', className: 'form-control', name: '', type: 'text', defaultValue: localStorage.subjects[this.state.id].title })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'form-group row' },
                                        React.createElement(
                                            'label',
                                            { id: 'editModal-detail', className: 'col-form-label', htmlFor: 'subject-detail' },
                                            '\u8A73\u7D30'
                                        ),
                                        React.createElement('br', null),
                                        React.createElement('textarea', { id: 'subject-detail', rows: '3', style: { width: "100%" }, className: 'htmlForm-control', defaultValue: localStorage.subjects[this.state.id].detail })
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'modal-footer' },
                                React.createElement(
                                    'button',
                                    { type: 'button', className: 'btn btn-secondary', 'data-dismiss': 'modal' },
                                    'Close'
                                ),
                                React.createElement(
                                    'button',
                                    { type: 'button', className: 'btn btn-primary', 'data-dismiss': 'modal', onClick: add_subject },
                                    '\u5909\u66F4'
                                )
                            )
                        )
                    )
                );
            }
        }]);

        return EditModal;
    }(React.Component);

    ;

    var toggle_add_subject_modal = function toggle_add_subject_modal() {
        return $("#addSubjectModal").modal('show');
    };

    var add_subject = function add_subject() {
        var data = JSON.parse(localStorage.subjects);
        var id = ID();
        data[id] = {
            id: id,
            title: $("#subject-name").val(),
            add: new Date(),
            detail: $("#subject-detail").val()
        };
        localStorage.subjects = JSON.stringify(data);

        subjects(); // redraw
    };

    apply(React.createElement(
        'div',
        { id: 'subject-temp' },
        React.createElement(Title, { pageName: 'Subjects' }),
        React.createElement(Menu, null),
        React.createElement(
            'div',
            { className: 'container' },
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-sm-12' },
                    React.createElement(
                        'h3',
                        { className: 'float-left' },
                        'Subjects you have'
                    ),
                    React.createElement(
                        'button',
                        { id: 'Toggle_AddSubjectModal', type: 'button', className: 'float-right btn btn-success', onClick: toggle_add_subject_modal },
                        'Subject\u3092\u8FFD\u52A0'
                    )
                ),
                hash_get_values(JSON.parse(localStorage.subjects)).sort(function (a, b) {
                    return new Date(b.add) - new Date(a.add);
                }).map(function (subject) {
                    return React.createElement(SubjectListItem, { key: subject.id, subject: subject });
                })
            )
        ),
        React.createElement(
            'div',
            { className: 'modal fade', id: 'addSubjectModal' },
            React.createElement(
                'div',
                { className: 'modal-dialog' },
                React.createElement(
                    'div',
                    { className: 'modal-content' },
                    React.createElement(
                        'div',
                        { className: 'modal-header' },
                        React.createElement(
                            'h4',
                            { className: 'modal-title' },
                            '\u65B0\u3057\u3044Subject\u3092\u8FFD\u52A0'
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'close', 'data-dismiss': 'modal' },
                            '\xD7'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-body' },
                        React.createElement(
                            'form',
                            null,
                            React.createElement(
                                'div',
                                { className: 'htmlForm-group row' },
                                React.createElement(
                                    'label',
                                    { className: 'col-form-label', htmlFor: 'subject-name' },
                                    '\u540D\u524D'
                                ),
                                React.createElement('input', { id: 'subject-name', className: 'form-control', name: '', type: 'text', defaultValue: '' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group row' },
                                React.createElement(
                                    'label',
                                    { className: 'col-form-label', htmlFor: 'subject-detail' },
                                    '\u8A73\u7D30'
                                ),
                                React.createElement('br', null),
                                React.createElement('textarea', { id: 'subject-detail', rows: '3', style: { width: "100%" }, className: 'htmlForm-control' })
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-footer' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-secondary', 'data-dismiss': 'modal' },
                            'Close'
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-primary', 'data-dismiss': 'modal', onClick: add_subject },
                            '\u8FFD\u52A0'
                        )
                    )
                )
            )
        )
    ));
};

var tasks = function tasks() {
    setDisplayItem('tasks');

    var TaskListItem = function TaskListItem(props) {
        return React.createElement(
            'li',
            { className: 'list-group-item' },
            props.task.title,
            React.createElement(
                'small',
                { className: 'float-right text-muted' },
                '\u8FFD\u52A0\u65E5\uFF1A',
                dateFormat.format(new Date(props.task.add), 'MM/dd/yyyy')
            ),
            function () {
                if (props.task.deadline) return React.createElement(
                    'p',
                    null,
                    React.createElement(
                        'small',
                        { className: 'float-right text-muted' },
                        '\u7DE0\u3081\u5207\u308A\uFF1A',
                        props.task.deadline
                    )
                );
            }()
        );
    };

    var toggle_add_task_modal = function toggle_add_task_modal() {
        return $("#myModal").modal('show');
    };

    var add_task = function add_task() {
        var data = JSON.parse(localStorage.tasks);
        var id = ID();
        data[id] = {
            id: id,
            title: $("#task-name").val(),
            add: new Date(),
            deadline: $("#task-deadline").val().replace(/-/g, '/').substr(5) + "/" + $("#task-deadline").val().replace(/-/g, '/').substr(0, 4)
        };
        localStorage.tasks = JSON.stringify(data);

        tasks(); // redraw
    };

    apply(React.createElement(
        'div',
        { id: 'task-temp' },
        React.createElement(Title, { pageName: 'Tasks' }),
        React.createElement(Menu, null),
        React.createElement(
            'div',
            { className: 'container' },
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-sm-12' },
                    React.createElement(
                        'div',
                        { id: 'task-list' },
                        React.createElement(
                            'div',
                            { className: 'list-group' },
                            React.createElement(
                                'li',
                                { className: 'list-group-item active' },
                                React.createElement(
                                    'h3',
                                    { className: 'float-left' },
                                    'Tasks you have to DO'
                                ),
                                React.createElement(
                                    'button',
                                    { id: 'Toggle_AddTaskModal', type: 'button', className: 'float-right btn btn-success', onClick: toggle_add_task_modal },
                                    '\u65B0\u3057\u3044Task\u3092\u767B\u9332'
                                )
                            ),
                            hash_get_values(JSON.parse(localStorage.tasks)).sort(function (a, b) {
                                return new Date(b.add) - new Date(a.add);
                            }).map(function (task) {
                                return React.createElement(TaskListItem, { key: task.id, task: task });
                            })
                        )
                    )
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'modal fade', id: 'myModal' },
            React.createElement(
                'div',
                { className: 'modal-dialog' },
                React.createElement(
                    'div',
                    { className: 'modal-content' },
                    React.createElement(
                        'div',
                        { className: 'modal-header' },
                        React.createElement(
                            'h4',
                            { className: 'modal-title' },
                            '\u65B0\u3057\u3044\u30BF\u30B9\u30AF\u3092\u8FFD\u52A0'
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'close', 'data-dismiss': 'modal' },
                            '\xD7'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-body' },
                        React.createElement(
                            'form',
                            null,
                            React.createElement(
                                'div',
                                { className: 'htmlForm-group row' },
                                React.createElement(
                                    'label',
                                    { className: 'col-form-label', htmlFor: 'task-name' },
                                    '\u30BF\u30B9\u30AF\u540D'
                                ),
                                React.createElement('input', { id: 'task-name', className: 'form-control', name: '', type: 'text', defaultValue: '' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group row' },
                                React.createElement(
                                    'label',
                                    { className: 'col-form-label', htmlFor: 'task-tags' },
                                    '\u30BF\u30B0'
                                ),
                                React.createElement('input', { id: 'task-tags', className: 'form-control', name: 'task-tags', type: 'text', defaultValue: '' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group row' },
                                React.createElement(
                                    'label',
                                    { className: 'col-form-label', htmlFor: 'task-deadline' },
                                    '\u30BF\u30B9\u30AF\u7DE0\u3081\u5207\u308A'
                                ),
                                React.createElement('input', { id: 'task-deadline', className: 'form-control', name: '', type: 'date', defaultValue: dateFormat.format(new Date(), 'yyyy-MM-dd') })
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group row' },
                                React.createElement(
                                    'label',
                                    { className: 'col-form-label', htmlFor: 'task-detail' },
                                    '\u30BF\u30B9\u30AF\u8A73\u7D30'
                                ),
                                React.createElement('br', null),
                                React.createElement('textarea', { id: 'task-detail', rows: '3', style: { width: "100%" }, className: 'htmlForm-control' })
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-footer' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-secondary', 'data-dismiss': 'modal' },
                            'Close'
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-primary', 'data-dismiss': 'modal', onClick: add_task },
                            '\u8FFD\u52A0'
                        )
                    )
                )
            )
        )
    ));
};

var setting = function setting() {
    setDisplayItem('setting');
    apply(React.createElement(
        'div',
        { id: 'app-temp' },
        React.createElement(
            'div',
            { className: 'content' },
            React.createElement(Title, { pageName: '\u8A2D\u5B9A' }),
            React.createElement(Menu, null),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-sm-3', style: { backgroundColor: "#ccc8" } },
                    React.createElement(
                        'ul',
                        null,
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { href: '#appearance' },
                                '\u5916\u898B'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { href: '#user' },
                                '\u30E6\u30FC\u30B6\u30FC\u8A2D\u5B9A'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { href: '#storage' },
                                'User Storage'
                            )
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-primary', onClick: saveSettings },
                            '\u8A2D\u5B9A\u3092\u4FDD\u5B58'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-9' },
                    React.createElement(
                        'h3',
                        { id: 'appearance' },
                        '# \u5916\u898B'
                    ),
                    React.createElement(
                        'p',
                        null,
                        '\u80CC\u666F\u8272 : ',
                        React.createElement('input', { id: 'settings-background-color', name: '', type: 'text', defaultValue: settings.backgroundColor })
                    ),
                    React.createElement(
                        'p',
                        null,
                        '\u6587\u5B57\u8272 : ',
                        React.createElement('input', { id: 'settings-contrast-color', name: '', type: 'text', defaultValue: settings.color })
                    ),
                    React.createElement(
                        'h3',
                        { id: 'user' },
                        '# \u30E6\u30FC\u30B6\u30FC\u8A2D\u5B9A'
                    ),
                    React.createElement(
                        'p',
                        null,
                        '\u30E6\u30FC\u30B6\u30FC\u540D : ',
                        React.createElement('input', { id: 'settings-name', name: '', type: 'text', defaultValue: settings.userName })
                    ),
                    React.createElement(
                        'p',
                        null,
                        '\u30D1\u30B9\u30EF\u30FC\u30C9 : ',
                        React.createElement('input', { id: 'settings-password', name: '', type: 'text', defaultValue: settings.userPassword })
                    ),
                    React.createElement(
                        'h3',
                        { id: 'storage' },
                        '# User Storages'
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Kajizuka\u306FwebStorage\u306ElocalStorage\u3092\u5229\u7528\u3057\u3066\u9759\u7684\u306A\u30A2\u30D7\u30ED\u30FC\u30C1\u3067\u30B5\u30FC\u30D3\u30B9\u3092\u63D0\u4F9B\u3057\u3066\u3044\u307E\u3059\u3002',
                        React.createElement(
                            'b',
                            null,
                            '\u30B9\u30C8\u30EC\u30FC\u30B8\u306B\u306F\u4E0A\u8A18\u306E\u8A2D\u5B9A\u9805\u76EE\u306E\u5185\u5BB9\u3084\u3042\u306A\u305F\u306E\u30BF\u30B9\u30AF\u306A\u3069\u30A2\u30D7\u30EA\u306E\u60C5\u5831\u304C\u5168\u3066\u8A70\u307E\u3063\u3066\u3044\u307E\u3059\u3002'
                        ),
                        '\u30B9\u30C8\u30EC\u30FC\u30B8\u3092\u524A\u9664\u3059\u308B\u3068\u3042\u306A\u305F\u306E\u60C5\u5831\u306F\u5168\u3066\u524A\u9664\u3055\u308C\u308B\u306E\u3067\u6CE8\u610F\u3057\u3066\u304F\u3060\u3055\u3044\u3002'
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', className: 'btn btn-danger', onClick: clearStorage },
                        '\u30B9\u30C8\u30EC\u30FC\u30B8\u3092\u524A\u9664\u3059\u308B'
                    )
                )
            )
        )
    ));
};

var welcome = function welcome() {
    var content = React.createElement(
        'div',
        { id: 'welcome-temp' },
        React.createElement(
            'div',
            { className: 'mx-auto', style: { width: '80%' } },
            React.createElement(
                'h1',
                { id: 'logo', className: 'text-center' },
                React.createElement('img', { alt: '', src: '/logo/kajizuka.png' }),
                'Kajizuka'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'em',
                    null,
                    '\u7C21\u5358\u306B\u8A00\u3046\u3068\u9AD8\u6A5F\u80FD\u306A\u30BF\u30B9\u30AF\u7BA1\u7406\u30A2\u30D7\u30EA\u3067\u3059\u3002 Kajizuka(\u8235\u67C4)\u3068\u306F\u8239\u306E\u8235\u3092\u56DE\u3059\u6642\u306B\u63E1\u308B\u8235\u68D2\u306E\u3053\u3068\u3067\u30E6\u30FC\u30B6\u30FC\u306E\u30BF\u30B9\u30AF\u306E\u8235\u53D6\u308A\u3068\u306A\u308B\u3088\u3046\u306A \u30A2\u30D7\u30EA\u306B\u306A\u3063\u3066\u307B\u3057\u3044\u3068\u3044\u3046\u9858\u3044\u304C\u8FBC\u3081\u3089\u308C\u3066\u3044\u307E\u3059\u3002'
                )
            ),
            React.createElement(
                'p',
                { className: 'text-center' },
                React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-primary text-center', onClick: app_template },
                    '\u65E9\u901F\u4F7F\u3063\u3066\u307F\u308B'
                )
            )
        ),
        React.createElement(
            'div',
            { id: 'content', className: 'container' },
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { id: 'features' },
                    React.createElement(
                        'a',
                        { href: '#features', className: 'topic' },
                        '# \u7279\u5FB4'
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-md-6 col-lg-3 topic-panel' },
                            React.createElement(
                                'lead',
                                null,
                                React.createElement(
                                    'strong',
                                    null,
                                    '\u6C4E\u7528\u6027'
                                )
                            ),
                            React.createElement(
                                'p',
                                null,
                                '\u77ED\u671F\u7684\u306A\u4ED5\u4E8B\u304B\u3089\u751F\u6DAF\u3092\u304B\u3051\u3066\u9054\u6210\u3057\u305F\u3044\u9577\u671F\u7684\u306A\u76EE\u6A19\u307E\u3067\u3092\u3057\u3063\u304B\u308A\u3068\u30AB\u30D0\u30FC\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-6 col-lg-3 topic-panel' },
                            React.createElement(
                                'lead',
                                null,
                                React.createElement(
                                    'strong',
                                    null,
                                    '\u9759\u7684'
                                )
                            ),
                            React.createElement(
                                'p',
                                null,
                                '\u3042\u306A\u305F\u306E\u60C5\u5831\u3092\u30B5\u30FC\u30D0\u30FC\u306B\u4FDD\u5B58\u3057\u306A\u3044\u306E\u3067\u5B89\u5168\u3067\u3059\u3002\u5168\u3066\u306E\u4F5C\u696D\u306F\u3042\u306A\u305F\u306E\u30D6\u30E9\u30A6\u30B6\u4E0A\u3067\u5B8C\u7D50\u3057\u307E\u3059\u3002'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-6 col-lg-3 topic-panel' },
                            React.createElement(
                                'lead',
                                null,
                                React.createElement(
                                    'strong',
                                    null,
                                    '\u5171\u6709\u53EF\u80FD'
                                )
                            ),
                            React.createElement(
                                'p',
                                null,
                                'SNS\u306B\u9032\u6357\u3092\u6295\u7A3F\u3057\u305F\u3044\u3068\u601D\u3063\u305F\u6642\u306B\u3082\u7C21\u5358\u306B\u5171\u6709\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-6 col-lg-3 topic-panel' },
                            React.createElement(
                                'lead',
                                null,
                                React.createElement(
                                    'strong',
                                    null,
                                    '\u30D5\u30EB\u30AD\u30FC\u30DC\u30FC\u30C9\u64CD\u4F5C\u53EF\u80FD'
                                )
                            ),
                            React.createElement(
                                'p',
                                null,
                                '\u30AD\u30FC\u30DC\u30FC\u30C9\u3067\u7D20\u65E9\u304F\u64CD\u4F5C\u3059\u308B\u3053\u3068\u3082\u3067\u304D\u308B\u306E\u3067\u624B\u8EFD\u306B\u64CD\u4F5C\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002'
                            )
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { id: 'how-to-use' },
                    React.createElement(
                        'a',
                        { href: '#how-to-use', className: 'topic' },
                        '# \u4F7F\u3044\u65B9'
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-sm-12' },
                            React.createElement(
                                'p',
                                null,
                                'Kajizuka\u3067\u7BA1\u7406\u3067\u304D\u308B\u30BF\u30B9\u30AF\u306F3\u3064\u306B\u5206\u3051\u3089\u308C\u3066\u3044\u307E\u3059\u3002'
                            ),
                            React.createElement(
                                'dl',
                                null,
                                React.createElement(
                                    'dt',
                                    null,
                                    '1, Task'
                                ),
                                React.createElement(
                                    'dd',
                                    null,
                                    React.createElement(
                                        'p',
                                        null,
                                        'Task\u3068\u306F\u6700\u3082\u57FA\u672C\u7684\u306A\u30BF\u30B9\u30AF\uFF08\u305D\u306E\u540D\u306E\u901A\u308A\uFF09\u3067\u4E00\u65E5\u3084\u4E00\u9031\u9593\u3067\u7D42\u308F\u308B\u3088\u3046\u306A\u4ED5\u4E8B\u3092\u66F8\u304D\u307E\u3059\u3002',
                                        React.createElement('br', null),
                                        '\u5B8C\u4E86\u671F\u9650\u3084\u512A\u5148\u9806\u4F4D\u3092\u8A2D\u5B9A\u3059\u308B\u3053\u3068\u306F\u3067\u304D\u307E\u3059\u304C\u3001Task\u540C\u58EB\u3067\u95A2\u9023\u6027\u3092\u3082\u305F\u305B\u308B\u3053\u3068\u306F\u3067\u304D\u307E\u305B\u3093\u3002',
                                        React.createElement('br', null),
                                        '\u3053\u306E\u3088\u3046\u306A\u5834\u5408\u306F\u5F8C\u8FF0\u3059\u308BSubject\u3092\u4F7F\u3046\u3079\u304D\u3067\u3057\u3087\u3046\u3002'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'ex) \u300CTask; \u6628\u65E5\u66F8\u3044\u305F\u30B3\u30FC\u30C9\u306E\u30EA\u30D5\u30A1\u30AF\u30BF\u30EA\u30F3\u30B0\u300D \u300CTask; \u3007\u3007\u3055\u3093\u306E\u5BB6\u306B\u78BA\u8A8D\u306E\u96FB\u8A71\u300D'
                                    )
                                ),
                                React.createElement(
                                    'dt',
                                    null,
                                    '2, Subject'
                                ),
                                React.createElement(
                                    'dd',
                                    null,
                                    React.createElement(
                                        'p',
                                        null,
                                        'Subject\u306F\u5927\u304D\u306A\u30BF\u30B9\u30AF\u3067\u3059\u3001\u5927\u304D\u3055\u306F\u6C7A\u307E\u3063\u3066\u3044\u307E\u305B\u3093\u304C\u3001Task\u3092\u307E\u3068\u3081\u308B\u3082\u306E\u3001\u3068\u3044\u3046\u8A8D\u8B58\u304C\u826F\u3044\u3067\u3057\u3087\u3046\u3002'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'ex) \u300CSubject: \u65B0\u4E8B\u696D\u300D \u300CTask; \u52D5\u753B\u30D7\u30EC\u30A4\u30E4\u30FC\u306E\u958B\u767A\u300D'
                                    )
                                ),
                                React.createElement(
                                    'dt',
                                    null,
                                    '3, Idea'
                                ),
                                React.createElement(
                                    'dd',
                                    null,
                                    React.createElement(
                                        'p',
                                        null,
                                        'Idea\u306F\u3042\u306A\u305F\u304C\u3084\u308A\u305F\u3044\u306A\u3068\u601D\u3063\u305F\u3053\u3068\u3092\u3059\u3050\u66F8\u304D\u7559\u3081\u308B\u3053\u3068\u304C\u3067\u304D\u308B\u5834\u6240\u3067\u3059\u3002',
                                        React.createElement('br', null),
                                        '\u5927\u304D\u306A\u76EE\u6A19\u3084\u65B0\u3057\u3044\u4E8B\u696D\u3092\u66F8\u304F\u3068\u3044\u3046\u3053\u90FD\u306B\u4F7F\u3046\u3053\u3068\u304C\u3067\u304D\u3001\u3044\u3056\u624B\u3092\u4ED8\u3051\u3059\u308B\u969B\u306B\u306FSubject\u306B\u4E0B\u308D\u3057\u3066\u304D\u3066\u4F5C\u696D\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'ex) \u300CIdea... \u5730\u7403\u5236\u670D\u300D \u300CIdea... \u539F\u5B50\u30B3\u30F3\u30D4\u30E5\u30FC\u30BF\u3092\u4F5C\u308B\u3093\u3060\uFF01\u300D'
                                    )
                                )
                            ),
                            React.createElement(
                                'p',
                                null,
                                '\u305D\u3057\u3066\u3001\u3053\u306E3\u3064\u30BF\u30B9\u30AF\u3092Timeline\u3068\u8A00\u3046\u30DA\u30FC\u30B8\u3067\u7BA1\u7406\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002 \u4F7F\u3044\u65B9\u306F\u304B\u306A\u308A\u30B7\u30F3\u30D7\u30EB\u306B\u3057\u305F\u3064\u3082\u308A\u3067\u3059\u3002\u3067\u306F\u3001\u4F7F\u3063\u3066\u307F\u307E\u3057\u3087\u3046\uFF01'
                            )
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'mx-auto', style: { width: '80%' } },
                React.createElement(
                    'p',
                    { className: 'text-center' },
                    React.createElement(
                        'button',
                        { type: 'button', className: 'btn btn-primary text-center', onClick: app_template },
                        '\u65E9\u901F\u4F7F\u3063\u3066\u307F\u308B'
                    )
                )
            ),
            React.createElement('hr', null),
            React.createElement(
                'h6',
                null,
                'Creative GP (C) 2018'
            )
        )
    );
    var page = document.getElementById('page');
    ReactDOM.render(content, page);
};

var app = function app() {
    var helloReact = React.createElement(
        'div',
        null,
        'Hello! React!'
    );
    var content = document.getElementById('content');
    ReactDOM.render(helloReact, content);
};