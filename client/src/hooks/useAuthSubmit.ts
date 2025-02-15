import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthProvider';
import { loginUser, registerUser } from '@/services/api';
import { useTranslations } from 'next-intl';
import { useNavigation, Routes } from './useNavigation';
import { User } from '@/types';
import { AuthType } from '@/types';

type AuthFormData = {
    name?: string;
    email: string;
    password: string;
};

type AuthResponse = {
    token: string;
    user: User;
};

const useAuthMessages = (type: AuthType, t: (key: string) => string) => {
    return type === AuthType.login
        ? { success: t('loginSuccessful'), error: t('loginError') }
        : { success: t('registerSuccessful'), error: t('registerError') };
};

const handleAuthResponse = (
    response: AuthResponse,
    login: (token: string, user: User) => void,
    successMessage: string,
    navigate: (route: Routes) => void,
) => {
    if (response.token && response.user) {
        login(response.token, response.user);
        toast.success(successMessage);
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

    const onSubmit = async (data: AuthFormData) => {
        try {
            const response = await handleRegisterAndLogin(data);
            handleAuthResponse(response, login, messages.success, navigate);
        } catch (err) {
            if (err instanceof Error) {
                try {
                    toast.error(t(err.message));
                } catch {
                    toast.error(t('internalServerError'));
                }
            }
        }
    };

    return { onSubmit };
};
