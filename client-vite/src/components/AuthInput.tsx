import React from 'react';
import { Input } from '@chakra-ui/react';
import { AuthInputProps } from '../types/auth';

const AuthInput: React.FC<AuthInputProps> = ({ value, onChange, placeholder, type = 'text' }) => {
    return (
        <Input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            size="md"
        />
    );
};

export default AuthInput;
