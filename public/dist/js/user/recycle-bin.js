const userTable = document.querySelector('#user-table');
const sortByIdDesc = document.querySelector('#sortByIdDesc');
const sortByIdAsc = document.querySelector('#sortByIdAsc');
const sortByUsernameDesc = document.querySelector('#sortByUsernameDesc');
const sortByUsernameAsc = document.querySelector('#sortByUsernameAsc');
const searchQuery = document.querySelector('#searchQuery');
const searchBtn = document.querySelector('#searchBtn');

const userHandler = {
    userPerPage: 5,
    isSearching: false,
    apiUrl: 'http://localhost:4000/api/v1/users',
    getOption: { method: 'GET' },
    postOption: function(jsonBody) {
        return {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'credentials': 'include',
                'Content-Type': 'application/json'
            },
            body: jsonBody
        }
    },
    patchOptions: { method: 'PATCH' },
    deleteOption: { method: 'DELETE' },
    renderUserTable: function(users) {
        const _this = this;

        if (!users) {
            userTable.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center">
                        There is no available user in database.
                    </td>
                </tr>
            `;
            return;
        }

        let paginationHtmls = [
            `
                <li class="paginate_button page-item previous">
                    <button class="page-link" id="prevBtn" href="">Previous</button>
                </li>
            `
        ];

        for (let i = 1; i <= Math.ceil(users.countItems/5); i++) {
            let li = `
                <li class="paginate_button page-item">
                    <button class="page-link page-element" href="" data-page="${i}">${i}</button>
                </li>
            `;
            paginationHtmls.push(li);
        }

        paginationHtmls.push(`
            <li class="paginate_button page-item next">
                <button class="page-link" id="nextBtn" href="">Next</button>
            </li>
        `);

        const tableHtmls = users.rows.map(user => {
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
                    <td>${user.status}</td>
                    <td>${user.name}</td>
                    <td>
                        <a href="/user/${user.user_id}/edit" class="btn btn-link">Edit</a>
                        <a href="" data-id="${user.user_id}" class="btn btn-link" data-toggle="modal" data-target="#delete-user-modal">Delete</a>
                    </td>
                </tr>
            `;
        });

        // Append html
        document.querySelector('#paginationUl').innerHTML = paginationHtmls.join('');
        userTable.innerHTML = tableHtmls.join('');

        // Listen to event
        document.querySelectorAll('.page-element').forEach(item => {
            item.addEventListener('click', () => {
                _this.paginate(item.dataset.page);
            });
        });
    },
    getUsersWhenPageLoad: async function() {
        const response = await fetch(`${this.apiUrl}?_trash`, this.getOption);
        this.handleResponseData(response);
    },
    handleResponseData: async function(response) {
        if (!response.ok) {
            alert('Error');
        } else {
            const users = await response.json();
            this.renderUserTable(users);
        }
    },
    forceDeleteOneById: async function(id) {
        const response = await fetch(`${this.apiUrl}/${id}/force`, this.deleteOption);

        if (!response.ok) {
            alert('Error');
        } else {
            return location.reload();
        }
    },
    restoreOneById: async function(id) {
        const response = await fetch(`${this.apiUrl}/${id}/restore`, this.patchOptions);

        if (!response.ok) {
            alert('Error');
        } else {
            return location.reload();
        }
    },
    selectCheckBoxActionHandler: async function() {
        const action = document.getElementById('selectAction').value;
        const userIds = [];

        document.querySelectorAll('.isChecked').forEach(item => {
            userIds.push(item.value);
        });

        const option = this.postOption(JSON.stringify({
            action,
            userIds
        }));

        const response = await fetch(`${this.apiUrl}/handle-trash-page-actions`, option);

        if (!response.ok) {
            alert('Error');
        } else {
            return location.reload();
        }
    },
    sort: async function(column, type) {
        if (!this.isSearching) {
            const response = await fetch(`${this.apiUrl}?_sort&column=${column}&type=${type}&_trash`, this.getOption);
            this.handleResponseData(response);
            return;
        }

        const response = await fetch(`${this.apiUrl}?_search=${searchQuery.value}&_sort&column=${column}&type=${type}&_trash`, this.getOption);
        this.handleResponseData(response);
    },
    search: async function(query) {
        const response = await fetch(`${this.apiUrl}?_search=${query}&_trash`, this.getOption);
        this.handleResponseData(response);
    },
    paginate: async function(page) {
        const offset = (parseInt(page, 10) - 1) * this.userPerPage;
        
        if (!this.isSearching) {
            const response = await fetch(`${this.apiUrl}?_pagination&limit=${this.userPerPage}&offset=${offset}&_trash`, this.getOption);
            this.handleResponseData(response);
            return;
        }

        const response = await fetch(`${this.apiUrl}?_search=${searchQuery.value}&_pagination&limit=${this.userPerPage}&offset=${offset}&_trash`, this.getOption);
        this.handleResponseData(response);
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

        document.querySelector('#btn-delete-user').onclick = async function() {
            _this.forceDeleteOneById(userId);
        }

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
            _this.selectCheckBoxActionHandler();
        };

        // Sort by id
        sortByIdDesc.onclick = function() {
            _this.sort('users.id', 'desc');
        }

        sortByIdAsc.onclick = function() {
            _this.sort('users.id', 'asc');
        }
        
        // Sort by username
        sortByUsernameDesc.onclick = function() {
            _this.sort('users.username', 'desc');
        }

        sortByUsernameAsc.onclick = function() {
            _this.sort('users.username', 'asc');
        }

        // Search
        window.onkeyup = function(e) {
            if (e.key === 'Enter') {
                if (searchQuery.value !== '') {
                    _this.search(searchQuery.value);
                    _this.isSearching = true;
                } else {
                    _this.getUsersWhenPageLoad();
                    _this.isSearching = false;
                }
            }
        }
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
