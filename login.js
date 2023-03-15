const form = document.getElementById('login_form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('login')
    login();
})
async function login() {
    const loginData = {
        email: document.getElementById('staticEmail').value,
        password: document.getElementById('inputPassword').value,
    };
    const res = await fetch('http://localhost:3000/auth', {
        method: 'POST', body: JSON.stringify(loginData),
        headers: { "Content-Type": "application/json" }
    });
    if (res.status == 400) {
        alert('Xatolik')
    }
    else if (res.status == 200) {
        const token = await res.json();
        localStorage.setItem('token',token)
        window.location.href = "index.html";
    }
}