const userTable = document.querySelector('#user-table');

const userHandler = {
    renderUserTable: function(users) {
        if (!users) {
            return;
        }

        const htmls = users.map(user => {
            return `
                <tr>
                    <td>
                        <div class="form-check">
                            <input class="form-check-input check-input-row" type="checkbox" name="userIds" value="${user.user_id}">
                        </div>
                    </td>
                    <td>${user.user_id}</td>
                    <td>${user.username}</td>
                    <td>${user.fullname}</td>
                    <td>
                        <img src="${user.avatar}" height="100px" width="100px">
                    </td>
                    <td>${user.status}</td>
                    <td>${user.name}</td>
                    <td>
                        <input class="btn btn-link restoreBtn" value="Restore" placeholder="${user.user_id}" readonly>
                        <a href="" data-id="${user.user_id}" class="btn btn-link" data-toggle="modal" data-target="#delete-user-modal">Delete</a>
                    </td>
                </tr>
            `;
        });

        userTable.innerHTML = htmls.join('');
    },
    forceDeleteOneById: async function(id) {
        const response = await fetch(`http://localhost:4000/api/v1/users/${id}/force`, { method: 'DELETE' });

        if (!response.ok) {
            alert('Error');
        } else {
            return location.reload();
        }
    },
    restoreOneById: async function(id) {
        const response = await fetch(`http://localhost:4000/api/v1/users/${id}/restore`, { method: 'PATCH' });

        if (!response.ok) {
            alert('Error');
        } else {
            return location.reload();
        }
    },
    getUsersWhenPageLoad: async function() {
        const response = await fetch('http://localhost:4000/api/v1/users/get-deleted-users', { method: 'GET' });
        const users = await response.json();
        this.renderUserTable(users);
    },
    actionsHandler: async function() {
        const action = document.getElementById('selectAction').value;
        const userIds = [];

        document.querySelectorAll('.isChecked').forEach(item => {
            userIds.push(item.value);
        });

        const response = await fetch('http://localhost:4000/api/v1/users/handle-trash-page-actions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'credentials': 'include',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action,
                userIds
            }),
        });

        if (!response.ok) {
            alert('Error');
        } else {
            return location.reload();
        }
    },
    renderCheckboxAllSubmitBtn: function() {
        const checkAllSubmitBtn = $('.check-all-submit-btn');
        let checkedCount = $('input[name="userIds"]:checked').length;

        if (checkedCount > 0) {
            checkAllSubmitBtn.attr('disabled', false);
        } else {
            checkAllSubmitBtn.attr('disabled', true);
        }
    },
    eventHandler: function() {
        console.log('Listening to events');

        const _this = this;

        // Delete one user with id
        let userId;

        $('#delete-user-modal').on('show.bs.modal', function(e) {
            let button = $(e.relatedTarget);
            userId = button.data('id');
        });

        document.querySelector('#btn-delete-user').onclick = function() {
            _this.forceDeleteOneById(userId);
        };

        // Restore one user with id
        document.querySelectorAll('.restoreBtn').forEach(item => {
            item.onclick = function() {
                _this.restoreOneById(item.placeholder);
            };
        });

        // Handle select buttons and select input
        const checkboxAll = document.querySelector('#checkboxAll');
        const userItemCheckbox = document.querySelectorAll('input[name="userIds"]');

        checkboxAll.onchange = function() {
            if (checkboxAll.checked == true) {
                document.querySelectorAll('input[name="userIds"]').forEach(function(item) {
                    item.checked = true;
                });
            } else {
                document.querySelectorAll('input[name="userIds"]').forEach(function(item) {
                    item.checked = false;
                });
            }

            if (document.querySelectorAll('.check-input-row:not(.isChecked)').length > 0) {
                document.querySelectorAll('.check-input-row:not(.isChecked)').forEach(function(item) {
                    item.classList.toggle('isChecked');
                });
            } else {
                document.querySelectorAll('.check-input-row').forEach(function(item) {
                    item.classList.toggle('isChecked');
                });
            }
            
            _this.renderCheckboxAllSubmitBtn();
        };

        userItemCheckbox.forEach(item => {
            item.onchange = function() {
                item.classList.toggle('isChecked');
                
                if (userItemCheckbox.length === document.querySelectorAll('.isChecked').length) {
                    checkboxAll.checked = true;
                } else {
                    checkboxAll.checked = false;
                }

                _this.renderCheckboxAllSubmitBtn();
            };
        });        

        document.querySelector('.check-all-submit-btn').onclick = function() {
            _this.actionsHandler();
        };
    },
    start: function() {
        const _this = this;

        _this.getUsersWhenPageLoad();

        setTimeout(function() {
            _this.eventHandler();
        }, 500);
    }
};

userHandler.start();
