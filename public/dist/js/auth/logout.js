document.getElementById("logout").addEventListener("click", function(e) {
    e.preventDefault();

    window.localStorage.removeItem('user');
    return window.location.href = 'http://localhost:4000/login';
});
