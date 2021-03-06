let settings = {
    backgroundColor: '#ffffff',
    color: '#212529',
    userPassword: '',
    userName: ''
};

let dateFormat = {
    fmt : {
        "yyyy": function(date) { return date.getFullYear() + ''; },
        "MM": function(date) { return ('0' + (date.getMonth() + 1)).slice(-2); },
        "dd": function(date) { return ('0' + date.getDate()).slice(-2); },
        "hh": function(date) { return ('0' + date.getHours()).slice(-2); },
        "mm": function(date) { return ('0' + date.getMinutes()).slice(-2); },
        "ss": function(date) { return ('0' + date.getSeconds()).slice(-2); }
    },
    format:function dateFormat (date, format) {
        var result = format;
        for (var key in this.fmt)
            result = result.replace(key, this.fmt[key](date));
        return result;
    }
};

function ID () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

let hash_map = function (hash, proc) {
    let result = [];
    for (let key in hash) {
        if (key === "map") continue;
        result.push(proc(key, hash[key]));
    }
    return result;
};

let hash_get_values = function (hash) {
    return hash_map(hash, (k, v) => v);
};

let hash_get_keys = function (hash) {
    return hash_map(hash, (k, v) => k);
};

$(document).ready(() => {
    let check_local_storage = () => {
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
            case 'timeline': timeline(); break;
            case 'setting': setting(); break;
            case 'tasks': tasks(); break;
            case 'subjects': subjects(); break;
            case 'ideas': ideas(); break;
        }
    }
});

let setDisplayItem = value => localStorage.setItem('scene', value);
let applyDefault = (value, def) => (value) ? value : def;

let apply = (react) => {
    let page = document.getElementById('page');
    ReactDOM.render(react, page);
};

let app_template = () => {
    tasks();
};

let clearStorage = () => {
    localStorage.clear();
    loadSettings();
    welcome();
};

let loadSettings = () => {
    settings.backgroundColor = applyDefault(localStorage.getItem('settings-background-color'), '#fff');
    settings.color = applyDefault(localStorage.getItem('settings-color'), "#212529");
    settings.userName = applyDefault(localStorage.getItem('settings-name'), "");
    settings.userPassword = applyDefault(localStorage.getItem('settings-password'), "");

    $("#page").css('background-color', settings.backgroundColor);
    $("#page").css('color', settings.color);
};

let saveSettings = () => {
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

let dropdown_menu = () => {
    if ($('#menu').css('display') == 'block') {
        $('#menu').css('display', 'none');
    } else {
        $('#menu').css('display', 'block');
    }
};


/* ////////////////////////////////////////////////////////////////////////////////////////////////

   Components

 */ ////////////////////////////////////////////////////////////////////////////////////////////////

const Title = React.createClass({
    propTypes: {
        pageName: React.PropTypes.string.isRequired
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-sm-12" style={{ margin: "none", borderBottom: "2px solid black" }}>
                    <a className="float-left">
                        <h2>
                            <img id="logo" alt="" src="/logo/kajizuka.png" width="64" height="64" />
                            Kajizuka | {this.props.pageName}
                        </h2>
                    </a>
                    <button type="button" className="float-right btn btn-link" onClick={dropdown_menu}>MENU</button>
                </div>
            </div>
        );
    }
});

const Menu = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div id="menu" className="col-sm-12 hidden-sm-down" style={{ margin: "none", borderBottom: "2px solid black" }}>
                    <button type="button" className="btn btn-link" onClick={timeline}>Timeline</button>
                    <button type="button" className="btn btn-link" onClick={tasks}>Tasks</button>
                    <button type="button" className="btn btn-link" onClick={subjects}>Subjects</button>
                    <button type="button" className="btn btn-link" onClick={ideas}>Ideas</button>
                    <button type="button" className="btn btn-link" onClick={setting}>設定</button>
                </div>
            </div>
        );
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////



let timeline = () => {
    setDisplayItem('timeline');
};

let ideas = () => {
    setDisplayItem('ideas');
};

let subjects = () => {
    setDisplayItem('subjects');

    let show_edit_subject_modal = (card) => {
        $("#editModal").modal('show');
        //        $("#editModal-title").html(
    };

    class SubjectListItem extends React.Component {
        constructor (props) {
            super(props);
            this.handleClick = this.handleClick.bind(this);
        }
        handleClick () {
            
        }
        render () {
            return (
                <div className="card w-50">
                    <div className="card-body">
                        <h4 className="card-title">{this.props.subject.title}
                            <button className="btn btn-link float-right h1 text-dark" onClick={show_edit_subject_modal(this.props.subject)}
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
                        <small className="text-muted float-right">
                            追加日：{dateFormat.format(new Date(this.props.subject.add), 'MM/dd/yyyy')}
                        </small>
                    </div>
                </div>
            );
        }
    };

    class EditModal extends React.Component {
        constructor () {
            super();
            this.state = { id: '' };
        }
        render () {
            return (
                <div className="modal fade" id="editModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="editModal-title" className="modal-title">
                                    Subject "{localStorage.subjects[this.state.id].title}" を変更
                                </h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="htmlForm-group row">
                                        <label id="editModal-name" className="col-form-label" htmlFor="subject-name">名前</label>
                                        <input id="subject-name" className="form-control" name="" type="text" defaultValue={localStorage.subjects[this.state.id].title}/>
                                    </div>
                                    <div className="form-group row">
                                        <label id="editModal-detail" className="col-form-label" htmlFor="subject-detail">詳細</label><br />
                                        <textarea id="subject-detail" rows="3" style={{width: "100%"}} className="htmlForm-control" defaultValue={localStorage.subjects[this.state.id].detail} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={add_subject}>変更</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    let toggle_add_subject_modal = () =>
        $("#addSubjectModal").modal('show');

    let add_subject = () => {
        let data = JSON.parse(localStorage.subjects);
        let id = ID();
        data[id] = {
            id: id,
            title: $("#subject-name").val(),
            add: new Date(),
            detail: $("#subject-detail").val(),
        };
        localStorage.subjects = JSON.stringify(data);

        subjects();  // redraw
    };

    apply(
        <div id="subject-temp">
            <Title pageName="Subjects" />
            <Menu />
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h3 className="float-left">Subjects you have</h3>
                        <button id="Toggle_AddSubjectModal" type="button" className="float-right btn btn-success" onClick={toggle_add_subject_modal}>Subjectを追加</button>
                    </div>
                    {hash_get_values(JSON.parse(localStorage.subjects))
                        .sort((a, b) => (new Date(b.add))-(new Date(a.add)))
                        .map((subject)=> <SubjectListItem key={subject.id} subject={subject} />)}
                </div>
            </div>

            <div className="modal fade" id="addSubjectModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">新しいSubjectを追加</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
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
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={add_subject}>追加</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

let tasks = () => {
    setDisplayItem('tasks');


    const TaskListItem = props => {
        return (
            <li className="list-group-item">
                {props.task.title}
                <small className="float-right text-muted">追加日：{dateFormat.format(new Date(props.task.add), 'MM/dd/yyyy')}</small>
                {(()=>{
                     if (props.task.deadline)
                         return <p><small className="float-right text-muted">締め切り：{props.task.deadline}</small></p>;
                })()}
            </li>
        );
    };

    let toggle_add_task_modal = () =>
        $("#myModal").modal('show');

    let add_task = () => {
        let data = JSON.parse(localStorage.tasks);
        let id = ID();
        data[id] = {
            id: id,
            title: $("#task-name").val(),
            add: new Date(),
            deadline: $("#task-deadline").val().replace(/-/g, '/').substr(5) + "/" + $("#task-deadline").val().replace(/-/g, '/').substr(0, 4)
        };
        localStorage.tasks = JSON.stringify(data);

        tasks();  // redraw
    };

    apply(
        <div id="task-temp">
            <Title pageName="Tasks" />
            <Menu />
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div id="task-list">
                            <div className="list-group">
                                <li className="list-group-item active">
                                    <h3 className="float-left">Tasks you have to DO</h3>
                                    <button id="Toggle_AddTaskModal" type="button" className="float-right btn btn-success" onClick={toggle_add_task_modal}>新しいTaskを登録</button>
                                </li>
                                {hash_get_values(JSON.parse(localStorage.tasks))
                                    .sort((a, b) => (new Date(b.add))-(new Date(a.add)))
                                    .map((task)=> <TaskListItem key={task.id} task={task} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={add_task}>追加</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
);
};

let setting = () => {
    setDisplayItem('setting');
    apply(
        <div id="app-temp">
            <div className="content">
                <Title pageName="設定" />
                <Menu />
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
        </div>
    );
};

let welcome = () => {
    let content = (
        <div id="welcome-temp">
            <div className="mx-auto" style={{ width: '80%' }}>
                <h1 id="logo" className="text-center">
                    <img alt="" src="/logo/kajizuka.png"/>
                    Kajizuka
                </h1>
                <p><em>簡単に言うと高機能なタスク管理アプリです。
                    Kajizuka(舵柄)とは船の舵を回す時に握る舵棒のことでユーザーのタスクの舵取りとなるような
                    アプリになってほしいという願いが込められています。</em></p>
                <p className="text-center"><button type="button" className="btn btn-primary text-center" onClick={app_template}>早速使ってみる</button></p>
            </div>

            <div id="content" className="container">
                <div className="row">
                    <div id="features">
                        <a href="#features" className="topic"># 特徴</a>
                        <div className="row">
                            <div className="col-md-6 col-lg-3 topic-panel">
                                <lead><strong>汎用性</strong></lead>
                                <p>短期的な仕事から生涯をかけて達成したい長期的な目標までをしっかりとカバーすることができます。</p>
                            </div>
                            <div className="col-md-6 col-lg-3 topic-panel">
                                <lead><strong>静的</strong></lead>
                                <p>あなたの情報をサーバーに保存しないので安全です。全ての作業はあなたのブラウザ上で完結します。</p>
                            </div>
                            <div className="col-md-6 col-lg-3 topic-panel">
                                <lead><strong>共有可能</strong></lead>
                                <p>SNSに進捗を投稿したいと思った時にも簡単に共有することができます。</p>
                            </div>
                            <div className="col-md-6 col-lg-3 topic-panel">
                                <lead><strong>フルキーボード操作可能</strong></lead>
                                <p>キーボードで素早く操作することもできるので手軽に操作することができます。</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div id="how-to-use">
                        <a href="#how-to-use" className="topic"># 使い方</a>
                        <div className="row">
                            <div className="col-sm-12">
                                <p>
                                    Kajizukaで管理できるタスクは3つに分けられています。
                                </p>
                                <dl>
                                    <dt>1, Task</dt>
                                    <dd>
                                        <p>Taskとは最も基本的なタスク（その名の通り）で一日や一週間で終わるような仕事を書きます。<br />
                                            完了期限や優先順位を設定することはできますが、Task同士で関連性をもたせることはできません。<br />
                                            このような場合は後述するSubjectを使うべきでしょう。
                                        </p>
                                        <p>ex) 「Task; 昨日書いたコードのリファクタリング」 「Task; 〇〇さんの家に確認の電話」</p>
                                    </dd>
                                    <dt>2, Subject</dt>
                                    <dd>
                                        <p>Subjectは大きなタスクです、大きさは決まっていませんが、Taskをまとめるもの、という認識が良いでしょう。</p>
                                        <p>ex) 「Subject: 新事業」 「Task; 動画プレイヤーの開発」</p>
                                    </dd>
                                    <dt>3, Idea</dt>
                                    <dd>
                                        <p>Ideaはあなたがやりたいなと思ったことをすぐ書き留めることができる場所です。<br />
                                            大きな目標や新しい事業を書くというこ都に使うことができ、いざ手を付けする際にはSubjectに下ろしてきて作業することができます。
                                        </p>
                                        <p>ex) 「Idea... 地球制服」 「Idea... 原子コンピュータを作るんだ！」</p>
                                    </dd>
                                </dl>
                                <p>そして、この3つタスクをTimelineと言うページで管理することができます。
                                    使い方はかなりシンプルにしたつもりです。では、使ってみましょう！</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="mx-auto" style={{ width: '80%' }}>
                    <p className="text-center"><button type="button" className="btn btn-primary text-center" onClick={app_template}>早速使ってみる</button></p>
                </div>

                <hr />
                <h6>Creative GP (C) 2018</h6>
            </div>
        </div>
);
    let page = document.getElementById('page');
    ReactDOM.render(content, page);
};
