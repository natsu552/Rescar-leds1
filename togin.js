import { supabase } from './supabase.js';

const form = document.getElementById('login-form');
const errorText = document.getElementById('login-error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorText.innerText = '';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        errorText.innerText = 'Preencha todos os campos!';
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    // Verifica se deu erro ou se o usuário não existe
    if (error || !data.user) {
        errorText.innerText = 'Email ou senha inválidos';
        return;
    }

    // Login OK
    window.location.href = 'admin.html';
});