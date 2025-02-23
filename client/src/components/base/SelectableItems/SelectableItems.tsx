import React, { useState } from 'react';
import { FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';
import { ChipsContainer, AutocompleteInput } from '@/components/base';
import { SelectableItemsChipPlacement } from '@/types/common';

interface SelectableItemsProps<T> {
    name: string;
    items: T[];
    selectedItems: T[];
    onAdd: (item: T) => void;
    onDelete: (item: T) => void;
    onAddNew?: (newItem: string) => Promise<T | null>;
    getOptionLabel: (item: T | string) => string;
    getKey: (item: T) => string | number;
    placeholder: string;
    label: string;
    error?: boolean;
    helperText?: string;
    loading?: boolean;
    chipPlacement?: SelectableItemsChipPlacement;
}
export const SelectableItems = <T extends object>({
    name,
    items,
    selectedItems,
    onAdd,
    onDelete,
    onAddNew,
    getOptionLabel,
    getKey,
    placeholder,
    label,
    error,
    helperText,
    loading,
    chipPlacement = SelectableItemsChipPlacement.top,
}: SelectableItemsProps<T>) => {
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState<T | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleAddNewItem = async (newValue: string) => {
        if (!onAddNew || !newValue.trim()) return;

        const newItem = await onAddNew(newValue.trim());
        if (newItem) {
            onAdd(newItem);
            setInputValue('');
            setValue(null);
            setIsOpen(false);
        }
    };

    const chipsContainer = (
        <ChipsContainer
            items={selectedItems}
            getKey={getKey}
            getOptionLabel={getOptionLabel}
            onDelete={onDelete}
        />
    );

    return (
        <FormControl fullWidth error={error}>
            {chipPlacement === SelectableItemsChipPlacement.top &&
                chipsContainer}

            <Controller
                name={name}
                render={() => (
                    <AutocompleteInput
                        items={items}
                        selectedItems={selectedItems}
                        getOptionLabel={getOptionLabel}
                        getKey={getKey}
                        inputValue={inputValue}
                        value={value}
                        onInputChange={(_, newInputValue) =>
                            setInputValue(newInputValue)
                        }
                        onChange={(_, newValue) => {
                            if (!newValue) return;

                            if (typeof newValue === 'string') {
                                handleAddNewItem(newValue);
                            } else {
                                onAdd(newValue);
                                setInputValue('');
                                setValue(null);
                                setIsOpen(false);
                            }
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && inputValue.trim()) {
                                event.preventDefault();
                                handleAddNewItem(inputValue);
                            }
                        }}
                        onAddNewItem={handleAddNewItem}
                        isOpen={isOpen}
                        onOpen={() => setIsOpen(true)}
                        onClose={() => setIsOpen(false)}
                        loading={!!loading}
                        label={label}
                        placeholder={placeholder}
                        error={!!error}
                        helperText={helperText || ''}
                    />
                )}
            />

            {chipPlacement === SelectableItemsChipPlacement.bottom &&
                chipsContainer}
        </FormControl>
    );
};
