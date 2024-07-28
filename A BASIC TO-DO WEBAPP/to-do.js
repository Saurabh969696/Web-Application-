document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;

    const dateTime = new Date().toLocaleString();

    addTask(title, desc, dateTime);
    this.reset();
});

function addTask(title, desc, dateTime) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span><strong>${title}:</strong> ${desc} <em>(${dateTime})</em></span>
        <div class="task-buttons">
            <button class="complete">Complete</button>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;

    document.getElementById('pending-tasks').appendChild(taskItem);

    taskItem.querySelector('.complete').addEventListener('click', function() {
        taskItem.classList.toggle('completed');
        if (taskItem.classList.contains('completed')) {
            document.getElementById('completed-tasks').appendChild(taskItem);
        } else {
            document.getElementById('pending-tasks').appendChild(taskItem);
        }
    });

    taskItem.querySelector('.edit').addEventListener('click', function() {
        const newTitle = prompt('Edit Title:', title);
        const newDesc = prompt('Edit Description:', desc);
        if (newTitle && newDesc) {
            taskItem.querySelector('span').innerHTML = `<strong>${newTitle}:</strong> ${newDesc} <em>(${dateTime})</em>`;
        }
    });

    taskItem.querySelector('.delete').addEventListener('click', function() {
        taskItem.remove();
    });
}
