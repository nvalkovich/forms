import { useAuth } from '@/context/AuthProvider';
import { loginUser, registerUser } from '@/services/api';
import { useTranslations } from 'next-intl';
import { useNavigation, Routes } from '../useNavigation';
import { AuthType } from '@/types/auth';
import { useTranslationsHook } from '@/i18n/routing';
import { toastSuccess, toastError } from '@/utils/toastify/utils';
import { AuthResponse, AuthFormData } from '@/types/auth';

const fetchErrorMessage = 'Failed to fetch';

const getAuthMessages = (type: AuthType, t: useTranslationsHook) => {
    return type === AuthType.login
        ? { success: t('loginSuccessful'), error: t('loginError') }
        : { success: t('registerSuccessful'), error: t('registerError') };
};

export const useAuthSubmit = (type: AuthType) => {
    const t = useTranslations('AuthPage');
    const { login } = useAuth();
    const { navigate } = useNavigation();

    const { success, error } = getAuthMessages(type, t);

    const handleAuthResponse = (response: AuthResponse) => {
        if (response.user && response.user.isBlocked) {
            toastError(t('userIsBlocked'));
            return;
        }
        if (response.token && response.user) {
            login(response.token, response.user);
            toastSuccess(success);
            navigate(Routes.profile);
        }
    };

    const handleLogin = async (email: string, password: string) => {
        return await loginUser(email, password);
    };

    const handleRegister = async (name: string, email: string, password: string) => {
        return await registerUser(name, email, password);
    };

    const onSubmit = async (data: AuthFormData) => {
        try {
            const response = type === AuthType.register && data.name
                ? await handleRegister(data.name, data.email, data.password)
                : await handleLogin(data.email, data.password);
            handleAuthResponse(response);
        } catch (err) {
            if (err instanceof Error) {
                if (err.message.includes(fetchErrorMessage)) {
                    toastError(t('networkError'));
                } else {
                    toastError(t(err.message));
                }
            } else {
                toastError(error);
            }
        }
    };

    return { onSubmit };
};