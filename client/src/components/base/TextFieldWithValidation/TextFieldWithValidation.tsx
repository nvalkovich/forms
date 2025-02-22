import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { EyeIcon, EyeOffIcon } from '@/components/icons';
import { TextFieldTypes } from '@/types/common';

interface TextFieldWithValidationProps {
    label: string;
    register: object;
    error: boolean;
    helperText: string | undefined;
    placeholder: string;
    type?: TextFieldTypes;
    required?: boolean;
    multiline?: boolean;
    showPassword?: boolean;
    toggleShowPassword?: () => void;
}

export const TextFieldWithValidation = ({
    label,
    register,
    error,
    helperText,
    placeholder,
    type = TextFieldTypes.text,
    multiline = false,
    showPassword,
    required,
    toggleShowPassword,
}: TextFieldWithValidationProps) => {
    const isPasswordField = type === TextFieldTypes.password;
    const passwordIconAriaLabel = 'toggle password visibility';

    return (
        <TextField
            margin="normal"
            required={required}
            fullWidth
            label={label}
            type={isPasswordField && showPassword ? TextFieldTypes.text : type}
            {...register}
            error={error}
            helperText={helperText}
            placeholder={placeholder}
            multiline={multiline}
            slotProps={{
                input: {
                    endAdornment: isPasswordField && (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={passwordIconAriaLabel}
                                onClick={toggleShowPassword}
                                edge="end"
                                size="small"
                            >
                                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
            sx={{ mb: 2 }}
        />
    );
};
