import { JIRA_BASE_URL } from '@/constants';

export const generateTicketLink = (ticketKey: string) => {
    return `${JIRA_BASE_URL}/servicedesk/customer/portal/2/${ticketKey}`;
};
