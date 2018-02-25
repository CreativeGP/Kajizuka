import React from 'react'
import Tasks from './Tasks'

export default class Welcome extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div id="welcome-temp">
                <div className="mx-auto" style={{ width: '80%' }}>
                    <h1 id="logo" className="text-center">
                        <img alt="" src="/logo/kajizuka.png" />
                        Kajizuka
                        </h1>
                    <p><em>簡単に言うと高機能なタスク管理アプリです。
                    Kajizuka(舵柄)とは船の舵を回す時に握る舵棒のことでユーザーのタスクの舵取りとなるような
                    アプリになってほしいという願いが込められています。</em></p>
                    <p className="text-center"><button type="button" className="btn btn-primary text-center" onClick={super.show}>早速使ってみる</button></p>
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
                        <p className="text-center"><button type="button" className="btn btn-primary text-center" onClick={super.show}>早速使ってみる</button></p>
                    </div>

                    <hr />
                    <h6>Creative GP (C) 2018</h6>
                </div>
            </div>
        )
    }
}