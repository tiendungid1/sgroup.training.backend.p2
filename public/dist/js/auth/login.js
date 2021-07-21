document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:4000/api/v1/auth/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'credentials': 'include',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })

    if (!response.ok) {
        const error = await response.json();
        console.log(error);

        if (error.code === 'BAD_REQUEST') {
            error.message.details.forEach(detail => {
                alert(detail.message);
            });
        }

        alert(error.message);
    } else {
        alert("Login successfully");
        const result = await response.json();

        localStorage.setItem('user', JSON.stringify(result));
        
        location.href = "/";
    }
})
