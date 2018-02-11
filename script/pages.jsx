let settings = {
    backgroundColor: '#ffffff',
    color: '#000000',
    userPassword: '',
    userName: ''
};

$(document).ready(() => {
    loadSettings();

    // Check user's storage
    if (!localStorage.visited) {
        // If it is new user, show setting.
        welcome();
        //        localStorage.visited = true;
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
    settings.backgroundColor = localStorage.getItem('settings-background-color');
    settings.color = localStorage.getItem('settings-color');
    settings.userName = localStorage.getItem('settings-name');
    settings.userPassword = localStorage.getItem('settings-password');

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

let timeline = () => {
    setDisplayItem('timeline');
};

let ideas = () => {
    setDisplayItem('ideas');
};

let subjects = () => {
    setDisplayItem('subjects');
};

let tasks = () => {
    setDisplayItem('tasks');
    apply(
        <div id="task-temp">
            <div className="content">
                <div className="row">
                    <div className="col-sm-12" style={{ margin: "none", borderBottom: "2px solid black" }}>
                        <a className="float-left">
                            <h2>
                                <img id="logo" alt="" src="/logo/kajizuka.png" width="64" height="64" />
                                Kajizuka | Tasks
                            </h2>
                        </a>
                        <button type="button" className="float-right btn btn-link" onClick={dropdown_menu}>MENU</button>
                    </div>
                </div>
                <div className="row">
                    <div id="menu" className="col-sm-12 hidden-sm-down" style={{ margin: "none", borderBottom: "2px solid black" }}>
                        <button type="button" className="btn btn-link" onClick={timeline}>Timeline</button>
                        <button type="button" className="btn btn-link" onClick={tasks}>Tasks</button>
                        <button type="button" className="btn btn-link" onClick={subjects}>Subjects</button>
                        <button type="button" className="btn btn-link" onClick={ideas}>Ideas</button>
                        <button type="button" className="btn btn-link" onClick={setting}>設定</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h3># Tasks you have to DO</h3>
                        <button type="button" className="btn btn-success">新しいTaskを登録</button>
                        <div id="task-list">
                            <div className="list-group">
                                <li className="list-group-item">Task; 昨日書いたコードのリファクタリング</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script type="text/javascript" src="script/task.js"></script>
        </div>
    );
};

let setting = () => {
    setDisplayItem('setting');
    apply(
        <div id="app-temp">
            <div className="content">
                <div className="row">
                    <div className="col-sm-12" style={{ margin: "none", borderBottom: "2px solid black" }}>
                        <a>
                            <h2>
                                <img id="logo" alt="" src="/logo/kajizuka.png" width="64" height="64" />
                                Kajizuka | 設定
                            </h2>
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div id="menu" className="col-sm-12 hidden-sm-down" style={{ margin: "none", borderBottom: "2px solid black" }}>
                        <button type="button" className="btn btn-link" onClick={timeline}>Timeline</button>
                        <button type="button" className="btn btn-link" onClick={tasks}>Tasks</button>
                        <button type="button" className="btn btn-link" onClick={subjects}>Subjects</button>
                        <button type="button" className="btn btn-link" onClick={ideas}>Ideas</button>
                        <button type="button" className="btn btn-link" onClick={setting}>設定</button>
                    </div>

                </div>
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
                        <p>パスワード : <input id="settings-" name="" type="text" defaultValue={settings.userPassword} /></p>
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

let app = () => {
    var helloReact = <div>Hello! React!</div>;
    var content = document.getElementById('content');
    ReactDOM.render(helloReact, content);
};
