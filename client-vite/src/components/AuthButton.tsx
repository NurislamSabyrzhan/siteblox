import React from 'react';
import { Button } from '@chakra-ui/react';
import { AuthButtonProps } from '../types/auth';

const AuthButton: React.FC<AuthButtonProps> = ({ provider, onClick }) => {
    return (
        <Button onClick={onClick} colorScheme="info" variant="solid">
            Войти через {provider === 'google' ? 'Google' : 'Instagram'}
        </Button>
    );
};

export default AuthButton;
