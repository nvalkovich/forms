export interface CreateTicketData {
    summary: string;
    priority: string;
    email: string | null;
}

export interface TicketModalData {
    summary: string;
    priority: string;
}

export enum TicketModalFields {
    summary = 'summary',
    priority = 'priority',
    email = 'email',
}

export interface JiraTicket {
    id: string;
    issueKey: string;
    fields: {
        summary: string;
        priority: { value: string };
        status: { value: string };
        template: string;
        link: string;
    };
}

export enum TicketCustomFields {
    template = 'customfield_10058',
    link = 'customfield_10059',
    status = 'customfield_10060',
    priority = 'customfield_10061',
}

export enum TicketIssueFields {
    summary = 'summary',
    priority = 'priority',
    status = 'status',
    link = 'link',
    template = 'template',
}
