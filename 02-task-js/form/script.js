import { validateFio, evaluatePassword } from './validators.js';


function setFieldState(fieldEl, { valid, message }) {
    const messageEl = fieldEl.querySelector('.form__message');

    fieldEl.classList.remove('form__field--error', 'form__field--valid');
    fieldEl.classList.add(valid ? 'form__field--valid' : 'form__field--error');
    messageEl.textContent = message;
}

function updatePasswordRules(rulesListEl, rules) {
    Object.entries(rules).forEach(([key, passed]) => {
        const item = rulesListEl.querySelector(`[data-rule="${key}"]`);
        if (item) {
            item.classList.toggle('form__rule--done', passed);
        }
    });
}

function initForm() {
    const form = document.getElementById('contactForm');
    const fioInput = document.getElementById('fioInput');
    const passwordInput = document.getElementById('passwordInput');
    const fioField = form.querySelector('[data-field="fio"]');
    const passwordField = form.querySelector('[data-field="password"]');
    const rulesListEl = document.getElementById('passwordRules');
    const submitBtn = form.querySelector('.form__submit');

    const state = {
        fioValid: false,
        passwordValid: false,
    };

    function syncSubmitButton() {
        submitBtn.disabled = !(state.fioValid && state.passwordValid);
    }

    fioInput.addEventListener('input', () => {
        const result = validateFio(fioInput.value);
        state.fioValid = result.valid;
        setFieldState(fioField, result);
        syncSubmitButton();
    });

    passwordInput.addEventListener('input', () => {
        const result = evaluatePassword(passwordInput.value);
        state.passwordValid = result.valid;
        setFieldState(passwordField, result);
        updatePasswordRules(rulesListEl, result.rules);
        syncSubmitButton();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!state.fioValid || !state.passwordValid) return;

        alert(`Form submitted!\nFIO: ${fioInput.value.trim()}`);
        form.reset();

        [fioField, passwordField].forEach((field) => {
            field.classList.remove('form__field--error', 'form__field--valid');
            field.querySelector('.form__message').textContent = '';
        });

        updatePasswordRules(rulesListEl, {
            length: false,
            uppercase: false,
            digit: false,
            special: false,
        });

        state.fioValid = false;
        state.passwordValid = false;
        syncSubmitButton();
    });
}

initForm();