import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getSalesforceFormSchema } from '@/utils/yup/salesforceFormValidationSchema';
import { SalesforceFormData } from '@/types/salesforce';
import { useAuth } from '@/context/AuthProvider';
import {
    createSalesForceAccountWithContact,
    getAccountById,
    updateAccount,
} from '@/services/api';
import { toastError, toastSuccess } from '@/utils/toastify/utils';
import { useTranslations } from 'next-intl';

enum SalesforceErrors {
    accountDeleted = 'salesforceAccountDeleted',
    accountNotExist = 'salesforceAccountNotExist',
}

export const useSalesforceForm = () => {
    const formTranslations = useTranslations('SalesforceForm');
    const formValidationTranslations = useTranslations(
        'SalesforceFormValidationErrors',
    );
    const errorTranslations = useTranslations('Errors');

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SalesforceFormData>({
        resolver: yupResolver(
            getSalesforceFormSchema(formValidationTranslations),
        ),
        defaultValues: { firstName: '', lastName: '', email: '', phone: '' },
    });

    const { token, user, refreshUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const splitName = (fullName: string = '') => {
        const [firstName, ...lastName] = fullName.split(' ');
        return {
            firstName: firstName || '',
            lastName: lastName.join(' ') || '',
        };
    };

    const applyUserData = () => {
        setIsEditing(false);
        setFormValues({
            ...splitName(user?.name ?? ''),
            email: user?.email ?? '',
        });
        refreshUser();
    };

    const setFormValues = (data: Partial<SalesforceFormData>) => reset(data);

    const loadSalesforceData = async (accountId: string) => {
        setIsLoading(true);
        setError(null);

        if (!token) {
            return;
        }

        try {
            const account = await getAccountById(accountId, token);

            if (!account) {
                setFormValues({
                    ...splitName(user?.name ?? ''),
                    email: user?.email ?? '',
                });
                setIsEditing(false);
                refreshUser();
                return;
            }

            setFormValues({
                ...splitName(account?.Name ?? ''),
                email: account.Email ?? user?.email ?? '',
                phone: account.Phone ?? '',
            });
            setIsEditing(true);
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === SalesforceErrors.accountNotExist
            ) {
                applyUserData();
            }
        } finally {
            setIsLoading(false);
        }
    };

    const initializeForm = () => {
        if (!token || !user || isInitialLoad) return;

        if (user.salesforceAccountId) {
            try {
                loadSalesforceData(user.salesforceAccountId);
                setIsEditing(true);
            } catch (error) {
                console.error(error);
            }
        } else {
            setFormValues({
                ...splitName(user.name ?? ''),
                email: user.email ?? '',
            });
            setIsEditing(false);
        }

        setIsInitialLoad(true);
    };

    useEffect(() => {
        initializeForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, token, isInitialLoad]);

    const handleError = (error: Error) => {
        if (error.message === SalesforceErrors.accountDeleted) {
            toastError(errorTranslations(SalesforceErrors.accountDeleted));
            applyUserData();
        } else {
            toastError(formTranslations('errorWhileFormSubmit'));
        }
    };

    const createAccount = async (data: SalesforceFormData) => {
        if (!token) {
            return;
        }

        await createSalesForceAccountWithContact(data, token);
        toastSuccess(formTranslations('accountCreated'));
        setIsEditing(true);
        refreshUser();
    };

    const updateExistingAccount = async (data: SalesforceFormData) => {
        if (!token) {
            return;
        }

        if (!user?.salesforceAccountId) return;
        await updateAccount(user.salesforceAccountId, data, token);
        toastSuccess(formTranslations('accountUpdated'));
    };

    const onSubmit = async (data: SalesforceFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            if (isEditing) {
                await updateExistingAccount(data);
            } else {
                await createAccount(data);
            }
        } catch (error) {
            if (error instanceof Error) {
                handleError(error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        control,
        handleSubmit,
        errors,
        isLoading,
        error,
        isEditing,
        isInitialLoad,
        onSubmit,
    };
};
