import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface TextFieldWithValidationProps {
    label: string;
    type: string;
    register: object;
    error: boolean;
    helperText: string | undefined;
    placeholder: string;
    showPassword?: boolean;
    toggleShowPassword?: () => void;
}

export const TextFieldWithValidation = ({
    label,
    type,
    register,
    error,
    helperText,
    placeholder,
    showPassword,
    toggleShowPassword,
}: TextFieldWithValidationProps) => {
    const isPasswordField = type === 'password';

    return (
        <TextField
            margin="normal"
            required
            fullWidth
            label={label}
            type={isPasswordField && showPassword ? 'text' : type}
            {...register}
            error={error}
            helperText={helperText}
            placeholder={placeholder}
            slotProps={{
                input: {
                    endAdornment: isPasswordField && (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={toggleShowPassword}
                                edge="end"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
            sx={{ mb: 2 }}
        />
    );
};
