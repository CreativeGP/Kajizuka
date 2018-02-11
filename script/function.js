let showTasks = () => {
    let v =
        `
                            <div className="list-group">
                                <li className="list-group-item active">
                                    <h3 className="float-left">Tasks you have to DO</h3>
                                    <button type="button" className="float-right btn btn-success">新しいTaskを登録</button>
                                </li>
`;

    for (let i = 0, len = localStorage.tasks.length; i < len; i++) {
        v += `
                                <li className="list-group-item">
                                    ${localStorage.tasks[i].content}
                                    <small className="float-right text-muted">${localStorage.tasks[i].add}</small>`;
        if (localStorage.tasks[i].deadline)
            v += `<p><small className="float-right text-muted">締め切り:${localStorage.tasks[i].deadline}</small></p>`;
        v += "</li>";
    }

    v += "</div>";
    $('#task-list').html(v);

};
