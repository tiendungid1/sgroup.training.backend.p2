document.getElementById('editUser').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const id = location.href.split('/')[4];

    const response = await fetch(`http://localhost:4000/api/v1/users/update-one`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'credentials': 'include',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            fullname,
            email,
            id
        })
    });

    if (!response.ok) {
        alert('Error');
    } else {
        alert('Success');
        return location.href = '/user';
    }
})
