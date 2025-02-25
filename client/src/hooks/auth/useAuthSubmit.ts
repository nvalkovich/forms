import { useAuth } from '@/context/AuthProvider';
import { loginUser, registerUser } from '@/services/api';
import { useTranslations } from 'next-intl';
import { useNavigation, Routes } from '../useNavigation';
import { User } from '@/types/user';
import { AuthType } from '@/types/auth';
import { useTranslationsHook } from '@/i18n/routing';
import { toastSuccess, toastError } from '@/utils/toastify/utils';

type AuthFormData = {
    name?: string;
    email: string;
    password: string;
};

type AuthResponse = {
    token: string;
    user: User;
};

const useAuthMessages = (type: AuthType, t: useTranslationsHook) => {
    const blokedUserMessage = t('userIsBlocked');

    const authMessages =
        type === AuthType.login
            ? { success: t('loginSuccessful'), error: t('loginError') }
            : { success: t('registerSuccessful'), error: t('registerError') };
    return { blokedUserMessage, ...authMessages };
};

const handleAuthResponse = (
    response: AuthResponse,
    login: (token: string, user: User) => void,
    messages: Record<string, string>,
    navigate: (route: Routes) => void,
) => {
    if (response.user && response.user.isBlocked) {
        toastError(messages.blokedUserMessage);
        return;
    }
    if (response.token && response.user) {
        login(response.token, response.user);
        toastSuccess(messages.successMessage);
        navigate(Routes.profile);
    }
};

export const useAuthSubmit = (type: AuthType) => {
    const t = useTranslations('AuthPage');
    const { login } = useAuth();
    const { navigate } = useNavigation();

    const messages = useAuthMessages(type, t);

    const handleRegisterAndLogin = async (data: AuthFormData) => {
        if (type === AuthType.register && data.name) {
            await registerUser(data.name, data.email, data.password);
        }
        return await loginUser(data.email, data.password);
    };

    const getErrorMessage = (key: string) => {
        try {
            return t(key);
        } catch {
            return t('internalServerError');
        }
    };

    const onSubmit = async (data: AuthFormData) => {
        try {
            const response = await handleRegisterAndLogin(data);
            handleAuthResponse(response, login, messages, navigate);
        } catch (err) {
            if (err instanceof Error) {
                if (err.message.includes('Failed to fetch')) {
                    toastError(getErrorMessage('networkError'));
                } else {
                    toastError(getErrorMessage(err.message));
                }
            } else {
                toastError(getErrorMessage('internalServerError'));
            }
        }
    };
    return { onSubmit };
};
