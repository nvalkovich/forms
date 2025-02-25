import { toast } from 'react-toastify';

export const toastError = (message: string) => toast.error(message);

export const toastSuccess = (message: string) => toast.success(message);

export const toastWarning = (message: string) => toast.warning(message);
