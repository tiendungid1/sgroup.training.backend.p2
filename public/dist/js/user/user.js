const userTable = document.querySelector('#user-table');

const userHandler = {
    renderUserTable: function(users) {
        const htmls = users.map(user => {
            return `
                <tr>
                    <td>
                        <div class="form-check" id="userIds">
                            <input class="form-check-input" type="checkbox" name="userIds" value="${user.user_id}">
                        </div>
                    </td>
                    <td>${user.user_id}</td>
                    <td>${user.username}</td>
                    <td>${user.fullname}</td>
                    <td>
                        <img src="${user.avatar}" height="100px" width="100px">
                    </td>
                    <td>${user.status}</td>
                    <td>${user.roles}</td>
                    <td>
                        <a href="/user/${user.user_id}/edit" class="btn btn-link">Edit</a>
                        <a href="/user/${user.user_id}" class="btn btn-link">Delete</a>
                    </td>
                </tr>
            `;
        });

        userTable.innerHTML = htmls.join('');
    },
    getUsersWhenPageLoad: async function() {
        const response = await fetch('http://localhost:4000/api/v1/users', { method: 'GET' });
        const users = await response.json();
        this.renderUserTable(users);
    },
    eventHandler: function() {

    },
    start: function() {
        this.getUsersWhenPageLoad();
        this.eventHandler();
    }
};

userHandler.start();
