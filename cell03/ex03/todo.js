document.addEventListener('DOMContentLoaded', function() {
    const newTaskButton = document.getElementById('new-task-button');
    const taskList = document.getElementById('ft_list');

    loadTasksFromCookies();

    newTaskButton.addEventListener('click', function() {
        addNewTask();
    });

    function addNewTask() {
        const taskContent = prompt('Enter a new task:');

        if (taskContent && taskContent.trim() !== '') {
            const taskItem = document.createElement('div');
            taskItem.className = 'task';
            taskItem.textContent = taskContent.trim();

            taskItem.addEventListener('click', function() {
                removeTask(this);
            });

            const firstTask = taskList.querySelector('.task');
            if (firstTask) {
                taskList.insertBefore(taskItem, firstTask);
            }
            else {
                const emptyMessage = taskList.querySelector('.empty-message');
                if (emptyMessage) {
                    taskList.removeChild(emptyMessage);
                }
                taskList.appendChild(taskItem);
            }
            saveTasksToCookies();
        }
    }

    function removeTask(taskElement) {
        const taskContent = taskElement.textContent;
        if (confirm(`Are you sure you want to delete the task: "${taskContent}"?`)) {
            taskElement.remove();
            if (taskList.querySelectorAll('.task').length === 0) {
                const emptyMessage = document.createElement('div');
                emptyMessage.className = 'empty-message';
                emptyMessage.textContent = 'No tasks yet. Click "New" to add one!';
                taskList.appendChild(emptyMessage);
            }
            saveTasksToCookies();
        }
    }

    function saveTasksToCookies() {
        const tasks = [];
        const taskElements = taskList.querySelectorAll('.task');

        taskElements.forEach(function(taskElement) {
            tasks.push(taskElement.textContent);
        });

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);

        const cookieValue = encodeURIComponent(JSON.stringify(tasks));
        document.cookie = `todoTasks=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;

        console.log('Tasks saved to cookies: ', tasks);
    }

    function loadTasksFromCookies() {
        const cookies = document.cookie.split(';');
        let todoCookie = null;

        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith('todoTasks=')) {
                todoCookie = cookie.substring('todoTasks='.length);
                break;
            }
        }
        
        if (todoCookie) {
            try {
                const tasks = JSON.parse(decodeURIComponent(todoCookie));
                const emptyMessage = taskList.querySelector('.empty-message');
                
                if (tasks.length > 0 && emptyMessage) {
                    taskList.removeChild(emptyMessage);
                }
                
                tasks.forEach(function(taskContent) {
                    const taskItem = document.createElement('div');
                    taskItem.className = 'task';
                    taskItem.textContent = taskContent;
                    
                    taskItem.addEventListener('click', function() {
                        removeTask(this);
                    });
                    
                    taskList.appendChild(taskItem);
                });
                
                console.log('Tasks loaded from cookies: ', tasks);
            } catch (e) {
                console.error('Error loading tasks from cookies: ', e);
                document.cookie = 'todoTasks=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            }
        } else {
            console.log('No saved tasks found in cookies.');
        }
    }
});