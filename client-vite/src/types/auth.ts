export interface AuthFormProps {
    onSubmit: (email: string, password: string) => void;
}

export interface AuthButtonProps {
    provider: 'google' | 'instagram';
    onClick: () => void;
}

export interface AuthInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: 'text' | 'password';
}
