function renderTableItem(user) {
    return `
        <tr>
            <td>${user.user_id}</td>
            <td>${user.username}</td>
            <td>${user.fullname}</td>
            <td>${user.status}</td>
            <td>${user.roles.toString()}</td>
        </tr>
    `;
};

$(async function() {
    const users = await $.ajax({
        url: 'http://localhost:4000/api/v1/users',
        method: 'GET'
    });

    users.forEach(user => {
        $('#user-table').append(renderTableItem(user));
    });
});
