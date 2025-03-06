import { useState } from 'react';
import { createJiraUser, createJiraIssue } from '@/services/api';
import { toast } from 'react-toastify';
import { generateTicketLink } from '@/utils/jiraUtils';
import { User } from '@/types/user';
import { useTranslations } from 'next-intl';
import { CreateTicketData } from '@/types/jira';
import { useTickets } from './useTickets';

export const useTicket = (user: User | null, token: string | null) => {
    const [ticketLink, setTicketLink] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const t = useTranslations('JiraTicketModal');

    const { fetchTickets } = useTickets(user?.jiraAccountId || '', token || '');

    const getOrCreateJiraAccountId = async (email: string | null) => {
        if (user?.jiraAccountId) {
            return user.jiraAccountId;
        }

        if (!email) {
            throw new Error();
        }

        const { accountId } = await createJiraUser(
            { emailAddress: email },
            token || undefined,
        );
        return accountId;
    };

    const createTicket = async (data: CreateTicketData) => {
        setLoading(true);

        try {
            const accountId = await getOrCreateJiraAccountId(
                user?.email || data.email,
            );

            const ticketResponse = await createJiraIssue({
                summary: data.summary,
                accountId,
                link: window.location.href,
                priority: data.priority,
            });

            setTicketLink(generateTicketLink(ticketResponse.issueKey));
            toast.success(t('ticketCreatedSuccesfully'));

            await fetchTickets();
        } catch (e) {
            console.error(e);
            toast.error(t('failedCreateTicket'));
        } finally {
            setLoading(false);
        }
    };

    return {
        ticketLink,
        loading,
        createTicket,
        resetTicket: () => setTicketLink(null),
    };
};
