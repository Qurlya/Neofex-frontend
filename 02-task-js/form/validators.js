export function validateFio(rawValue) {
    const value = rawValue.trim();

    if (!value) {
        return { valid: false, message: 'Field is required' };
    }

    const onlyLettersPattern = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    if (!onlyLettersPattern.test(value)) {
        return { valid: false, message: 'Use only letters' };
    }

    return { valid: true, message: '' };
}

export function evaluatePassword(value) {
    const rules = {
        length: value.length >= 8,
        uppercase: /[A-ZА-ЯЁ]/.test(value),
        digit: /\d/.test(value),
        special: /[!@#$%^&()+=[\]{};':"|,<>?~`]/.test(value),
    };

    if (!value) {
        return { valid: false, message: 'Field is required', rules };
    }

    const forbiddenPattern = /[-*/\\_]/;
    if (forbiddenPattern.test(value)) {
        return { valid: false, message: 'Not Use -*/\\_', rules };
    }

    const allPassed = Object.values(rules).every(Boolean);

    return {
        valid: allPassed,
        message: allPassed ? '' : 'Password does not meet all requirements',
        rules,
    };
}