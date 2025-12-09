function showToast(msg, type = 'success') {
    const t = document.createElement('div');
    t.className = 'toast ' + (type === 'error' ? 'error' : '');
    t.innerText = msg;
    document.body.appendChild(t);

    setTimeout(() => t.classList.add('show'), 30);
    setTimeout(() => t.classList.remove('show'), 2400);
    setTimeout(() => t.remove(), 3000);
}

function getUsers() { 
    return JSON.parse(localStorage.getItem('users')) || []; 
}

function saveUsers(users) { 
    localStorage.setItem('users', JSON.stringify(users)); 
}

function getCurrentUserId() { 
    const data = JSON.parse(localStorage.getItem('currentUser'));
    return data?.id || null;
}

function setCurrentUserId(id) { 
    localStorage.setItem('currentUser', JSON.stringify({ id })); 
}

function logout() { 
    localStorage.removeItem('currentUser'); 
}


function applyTheme(theme) {
    if (theme === 'dark') document.body.classList.add('dark');
    else document.body.classList.remove('dark');
}

function toggleTheme() {
    const current = localStorage.getItem('theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);


    document.querySelectorAll('#toggle-theme').forEach(btn => {
        btn.innerText = next === 'dark' ? '☀️' : '🌙';
    });
}

document.addEventListener('DOMContentLoaded', () => {

   
    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    document.querySelectorAll('#toggle-theme').forEach(btn => {
        btn.innerText = currentTheme === 'dark' ? '☀️' : '🌙';
        btn.addEventListener('click', toggleTheme);
    });


    initCadastro();
    initLogin();
    initPerfil();
    initColeta();
});

function initCadastro() {
    const form = document.querySelector('.cadastro-form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        const nome = form.querySelector("input[placeholder='Nome completo']").value.trim();
        const email = form.querySelector("input[type='email']").value.trim();
        const senha = form.querySelector("input[type='password']").value.trim();

        if (!nome || !email || !senha)
            return showToast('Preencha todos os campos!', 'error');

        const users = getUsers();

        if (users.some(u => u.email === email))
            return showToast('E-mail já está cadastrado!', 'error');

        users.push({
            id: Date.now(),
            nome,
            email,
            senha,
            coletas: 0
        });

        saveUsers(users);
        showToast('Conta criada com sucesso!');

        setTimeout(() => window.location.href = 'login.html', 900);
    });
}

function initLogin() {
    const form = document.querySelector('.login-form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        const email = form.querySelector("input[type='email']").value.trim();
        const senha = form.querySelector("input[type='password']").value.trim();

        const users = getUsers();
        const user = users.find(u => u.email === email && u.senha === senha);

        if (!user)
            return showToast('Credenciais inválidas!', 'error');

        setCurrentUserId(user.id);

        showToast('Login realizado!');
        setTimeout(() => window.location.href = 'perfil.html', 600);
    });
}

function initPerfil() {
    const nomeEl = document.querySelector('.perfil-nome');
    const emailEl = document.querySelector('.perfil-email');
    const qtdEl = document.querySelector('#qtdColetas');


    if (!nomeEl || !emailEl) return;

    const userId = getCurrentUserId();
    if (!userId) {
        logout();
        return window.location.href = 'login.html';
    }

    const users = getUsers();
    const user = users.find(u => u.id === userId);


    if (!user) {
        logout();
        return window.location.href = 'login.html';
    }

   
    nomeEl.textContent = user.nome || "Usuário";
    emailEl.textContent = user.email || "email não encontrado";
    if (qtdEl) qtdEl.textContent = user.coletas ?? 0;

    
    const btnSair = document.querySelector('.btn-sair');
    if (btnSair) {
        btnSair.addEventListener('click', () => {
            logout();
            window.location.href = 'login.html';
        });
    }
}


function initColeta() {
    const form = document.querySelector('.form-coleta form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        const userId = getCurrentUserId();

        if (!userId) {
            showToast('Faça login antes de solicitar coleta!', 'error');
            return setTimeout(() => window.location.href = 'login.html', 800);
        }

        const users = getUsers();
        const user = users.find(u => u.id === userId);

        if (!user) {
            logout();
            return window.location.href = 'login.html';
        }

        user.coletas++;
        saveUsers(users);

        showToast('Coleta enviada com sucesso!');
        form.reset();
    });
}
function initEditarPerfil() {
    const nomeInput = document.querySelector('#editNome');
    const emailInput = document.querySelector('#editEmail');
    const senhaInput = document.querySelector('#editSenha');
    const btnVoltar = document.querySelector('#voltarPerfil');

    const userId = getCurrentUserId();
    if (!userId) return window.location.href = 'login.html';

    const users = getUsers();
    const user = users.find(u => u.id === userId);

    if (!user) {
        logout();
        return window.location.href = 'login.html';
    }

  
    nomeInput.value = user.nome;
    emailInput.value = user.email;

    document.querySelector('#formEditarPerfil').addEventListener('submit', (e) => {
        e.preventDefault();

        user.nome = nomeInput.value.trim();
        user.email = emailInput.value.trim();

        if (senhaInput.value.trim() !== '') {
            user.senha = senhaInput.value.trim();
        }

        localStorage.setItem('users', JSON.stringify(users));
        alert('Perfil atualizado com sucesso!');
        window.location.href = 'perfil.html';
    });


    btnVoltar.addEventListener('click', () => {
        window.location.href = 'perfil.html';
    });
}

if (window.location.pathname.includes('editar-perfil.html')) {
    initEditarPerfil();
}
const perfilClickable = document.querySelector('#perfilClickable');
if (perfilClickable) {
    perfilClickable.addEventListener('click', () => {
        window.location.href = 'editar-perfil.html';
    });
}
