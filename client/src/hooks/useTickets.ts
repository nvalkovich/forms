import { useState, useEffect, useCallback } from 'react';
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
    const [pageSize] = useState(defaultPaginationValues.pageSize);
    const [totalCount, setTotalCount] = useState(0);

    const fetchTickets = useCallback(async () => {
        if (!accountId || !token) {
            setTickets([]);
            setTotalCount(0);
            return;
        }

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
    }, [ accountId, token, page, pageSize]);


    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

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