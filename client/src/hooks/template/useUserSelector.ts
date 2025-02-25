import { useState } from 'react';
import { User } from '@/types/user';
import {
    UserSortBy,
    filterCurrentUser,
    sortUsers,
    isUserSelected,
} from '@/utils/userSelectorUtils';

export const useUserSelector = (users: User[], currentUserId?: string) => {
    const [sortBy, setSortBy] = useState<UserSortBy>(UserSortBy.Name);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const filteredUsers = filterCurrentUser(users, currentUserId);

    const sortedUsers = sortUsers(filteredUsers, sortBy);

    const availableUsers = sortedUsers.filter(
        (user) => !isUserSelected(selectedUsers, user.id),
    );

    const handleAddUser = (user: User) => {
        if (isUserSelected(selectedUsers, user.id)) {
            return false;
        }
        setSelectedUsers((prev) => [...prev, user]);
        return true;
    };

    const handleDeleteUser = (userToDelete: User) => {
        setSelectedUsers((prev) =>
            prev.filter((user) => user.id !== userToDelete.id),
        );
    };

    return {
        sortBy,
        setSortBy,
        selectedUsers,
        availableUsers,
        handleAddUser,
        handleDeleteUser,
    };
};
