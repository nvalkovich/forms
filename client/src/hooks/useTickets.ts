import { useState, useEffect } from 'react';
import { getJiraIssuesByReporter } from '@/services/api';
import { JiraTicket } from '@/types/jira';

const defaultPaginationValues = {
    page: 0,
    pageSize: 5,
};

export const useTickets = (accountId: string, token?: string | null) => {
    const [tickets, setTickets] = useState<JiraTicket[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(defaultPaginationValues.page);
    const [pageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(0);

    const fetchTickets = async () => {
        if (!accountId || !token) return;

        try {
            setLoading(true);
            const response = await getJiraIssuesByReporter(
                token,
                accountId,
                page,
                pageSize,
            );

            setTickets(
                response.issues.map((ticket: JiraTicket) => ({
                    id: ticket.id,
                    issueKey: ticket.issueKey,
                    summary: ticket.fields.summary,
                    priority: ticket.fields.priority.value,
                    status: ticket.fields.status.value,
                    template: ticket.fields.template,
                    link: ticket.fields.link,
                })),
            );
            setTotalCount(response.total);
        } catch {
            setTickets([]);
            setTotalCount(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountId, token, page]);

    return {
        tickets,
        loading,
        page,
        setPage,
        pageSize,
        totalCount,
        fetchTickets,
    };
};
