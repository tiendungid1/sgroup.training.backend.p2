document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const username = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:4000/api/v1/auth/register", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'credentials': 'include',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullname,
                username,
                email,
                password,
            })
    });

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
        alert("Registration successfully");
        
        location.href = "http://localhost:4000/login";
    }
})
