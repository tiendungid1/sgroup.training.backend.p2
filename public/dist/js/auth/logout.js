document.getElementById("logout").addEventListener("click", function(e) {
    e.preventDefault();

    localStorage.removeItem('user');
    return location.href = '/login';
});
