// types
import { Translation } from '@/contexts/core/language';

export const es: Record<Translation, string> = {
    'app.title': 'OnLab-Clinical',
    'app.not-found': 'Página no encontrada 404',
    'app.start': 'Regresar al inicio',
    'theme.os': 'Sistema',
    'theme.light': 'Claro',
    'theme.dark': 'Oscuro',
    'actions.close': 'Cerrar',
    'actions.reload': 'Recargar',
    // authentication module
    'auth.username.label': 'Nombre',
    'auth.username.placeholder': 'Nombre de usuario',
    'auth.username.required': 'nombre de usuario es requerido',
    'auth.username.start': 'debe empezar con una letra',
    'auth.username.only': 'solo letras, números y guiones bajos "_"',
    'auth.username.min': 'mínimo 3 dígitos & máximo 32 dígitos',
    'auth.password.label': 'Contraseña',
    'auth.password.placeholder': 'Contraseña de usuario',
    'auth.password.required': 'contraseña de usuario es requerida',
    'auth.password.show': 'Mostrar contraseña',
    'auth.password.hide': 'Ocultar contraseña',
    'auth.password.lowercase': 'al menos una minúscula',
    'auth.password.uppercase': 'al menos una mayúscula',
    'auth.password.decimal': 'al menos un número',
    'auth.password.special': 'al menos un carácter especial',
    'auth.password.between': 'mínimo 8 dígitos & máximo 32 dígitos',
    // Sign in view
    'auth.sign-in.title': 'Inicio de sesión',
    'auth.sign-in.sign-in': 'Iniciar sesión',
    'auth.sign-in.sign-up-hint': 'Si aún no dispone de una cuenta, puedes crear una fácilmente',
    'auth.sign-in.sign-up-nav': 'aquí',
    'auth.sign-in.welcome': 'Bienvenido a OnLab-Clinical, área personal de paciente',
    // sign up view
    'auth.sign-up.title': '',
    'auth.sign-up.sign-up': '',
    'auth.sign-up.sign-in-nav': ''
};
