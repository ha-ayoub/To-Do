  export const getPasswordStrength = (password) => {
    if (!password) return { label: '', color: '', width: '0%' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { label: 'Faible', color: '#ef4444', width: '33%' };
    if (strength <= 3) return { label: 'Moyen', color: '#f59e0b', width: '66%' };
    return { label: 'Fort', color: '#10b981', width: '100%' };
  };
