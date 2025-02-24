import React from 'react';
import {
    Autocomplete,
    IconButton,
    InputAdornment,
    TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AutocompleteInputProps<T> {
    items: T[];
    selectedItems: T[];
    getOptionLabel: (item: T | string) => string;
    getKey: (item: T) => string | number;
    inputValue: string;
    value: T | null;
    onInputChange: (event: React.SyntheticEvent, newInputValue: string) => void;
    onChange: (
        event: React.SyntheticEvent,
        newValue: T | string | null,
    ) => void;
    onKeyDown: (event: React.KeyboardEvent) => void;
    onAddNewItem: (newValue: string) => void;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    loading: boolean;
    label: string;
    placeholder: string;
    error: boolean;
    helperText: string;
}

export const AutocompleteInput = <T extends object>({
    items,
    selectedItems,
    getOptionLabel,
    getKey,
    inputValue,
    value,
    onInputChange,
    onChange,
    onKeyDown,
    onAddNewItem,
    isOpen,
    onOpen,
    onClose,
    loading,
    label,
    placeholder,
    error,
    helperText,
}: AutocompleteInputProps<T>) => (
    <Autocomplete
        freeSolo
        options={items.filter(
            (item) => !selectedItems.some((s) => getKey(s) === getKey(item)),
        )}
        getOptionLabel={getOptionLabel}
        getOptionKey={(item) => (typeof item !== 'string' ? getKey(item) : '')}
        inputValue={inputValue}
        value={value}
        onInputChange={onInputChange}
        onChange={onChange}
        onKeyDown={onKeyDown}
        open={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        loading={loading}
        renderInput={(params) => (
            <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                error={error}
                helperText={helperText}
                InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <>
                            {inputValue.trim() && (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => onAddNewItem(inputValue)}
                                        edge="end"
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </InputAdornment>
                            )}
                            {params.InputProps.endAdornment}
                        </>
                    ),
                }}
            />
        )}
    />
);
