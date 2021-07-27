const userTable = document.querySelector('#user-table');

const userHandler = {
    renderUserTable: function(users) {
        const htmls = users.map(user => {
            return `
                <tr>
                    <td>
                        <div class="form-check userid-container">
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
                    <td>${user.roles}</td>
                    <td>
                        <a href="/user/${user.user_id}/edit" class="btn btn-link">Edit</a>
                        <a href="" data-id="${user.user_id}" class="btn btn-link" data-toggle="modal" data-target="#delete-user-modal">Delete</a>
                    </td>
                </tr>
            `;
        });

        userTable.innerHTML = htmls.join('');
    },
    softDeleteOneById: async function(id) {
        const response = await fetch(`http://localhost:4000/api/v1/users/${id}`, { method: 'DELETE' });

        if (!response.ok) {
            alert('Error');
        } else {
            return location.reload();
        }
    },
    getUsersWhenPageLoad: async function() {
        const response = await fetch('http://localhost:4000/api/v1/users', { method: 'GET' });
        const users = await response.json();
        this.renderUserTable(users);
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
    listenToContainerFormEvents: function() {
        const _this = this;
        const checkboxAll = document.querySelector('#checkboxAll');
        const userItemCheckbox = document.querySelectorAll('input[name="userIds"]');

        checkboxAll.onchange = function() {
            let isCheckedAll = checkboxAll.checked;
            userItemCheckbox.checked = isCheckedAll;

            if ($('.check-input-row:not(.isChecked)').length > 0) {
                $('.check-input-row:not(.isChecked)').toggleClass('isChecked');
            } else {
                $('.check-input-row').toggleClass('isChecked');
            }

            _this.renderCheckboxAllSubmitBtn();
        }

        userItemCheckbox.onchange = function() {
            let isCheckedAll = userItemCheckbox.length === document.querySelectorAll('input[name="userIds"]:checked').length;
            checkboxAll.checked = isCheckedAll;
            _this.renderCheckboxAllSubmitBtn();
        }
    
        document.querySelectorAll('.userid-container input').forEach(item => {
            item.addEventListener('change', function() {
                item.classList.toggle('isChecked');
            })
        });
    },
    eventHandler: function() {
        const _this = this;

        // Delete one user with id
        let userId;

        $('#delete-user-modal').on('show.bs.modal', function(e) {
            let button = $(e.relatedTarget);
            userId = button.data('id');
        });

        document.querySelector('#btn-delete-user').onclick = async function() {
            _this.softDeleteOneById(userId);
        }

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
            
            // _this.renderCheckboxAllSubmitBtn();
        }

        userItemCheckbox.forEach(item => {
            item.onchange = function() {
                console.log(item);
                if (userItemCheckbox.length == document.querySelectorAll('.isChecked').length) {
                    checkboxAll.checked = true;
                } else {
                    checkboxAll.checked = false;
                }
            }
        })

        // userItemCheckbox.onchange = function() {
        //     if (userItemCheckbox.length == document.querySelectorAll('.isChecked').length) {
        //         checkboxAll.checked = true;
        //     } else {
        //         checkboxAll.checked = false;
        //     }
        //     // _this.renderCheckboxAllSubmitBtn();
        // }

        document.querySelectorAll('.userid-container input').forEach(item => {
            item.addEventListener('change', function() {
                item.classList.toggle('isChecked');
            })
        });
    },
    start: function() {
        const _this = this;

        _this.getUsersWhenPageLoad();

        setTimeout(function() {
            _this.eventHandler();
        }, 300);
    }
};

userHandler.start();
