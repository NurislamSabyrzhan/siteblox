import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { Box, Button, Input, Text, Stack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";

interface FormData {
    email: string;
    password: string;
}

async function Login(data: FormData): Promise<AxiosResponse> {
    return axios.post("/auth/login", data);
}

export const Route = createFileRoute('/auth/login')({
    component: () => <LoginComponent />
});

function LoginComponent() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>();
    const toast = useToast();
    const navigate = useNavigate();

    const mutation = useMutation<AxiosResponse, AxiosError, FormData>({
        mutationFn: (data: FormData) => Login(data),
        onSuccess: () => {
            toast({
                title: "Вход успешен.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            navigate({
                to: "/dashboard"
            });
        },
        onError: (err: AxiosError) => {
            console.log(err);
            toast({
                title: "Ошибка входа.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
        },
    });

    const onSubmit = (data: FormData) => {
        mutation.mutate(data);
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minH="100vh"
            p={4}
            position="relative"
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `radial-gradient(gray 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
                zIndex: -1,
            }}
        >
            <Box
                bg="white"
                p={8}
                maxW="md"
                borderWidth={1}
                borderRadius="lg"
                boxShadow="2xl"
                backdropFilter="blur(10px)"
            >
                <Text fontSize="2xl" fontWeight="bold" mb={4}>
                    Вход в аккаунт
                </Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={4}>
                        <Box>
                            <Text fontSize="sm" fontWeight="medium" mb={1}>
                                Email
                            </Text>
                            <Input
                                placeholder="m@example.com"
                                size="lg"
                                {...register("email", {
                                    required: "Email обязателен",
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: "Некорректный email",
                                    },
                                })}
                                isInvalid={!!errors.email}
                            />
                            {errors.email && (
                                <Text color="red.500" fontSize="sm">
                                    {errors.email.message}
                                </Text>
                            )}
                        </Box>
                        <Box>
                            <Text fontSize="sm" fontWeight="medium" mb={1}>
                                Пароль
                            </Text>
                            <Input
                                type="password"
                                size="lg"
                                {...register("password", {
                                    required: "Пароль обязателен",
                                    minLength: {
                                        value: 6,
                                        message: "Пароль должен содержать минимум 6 символов",
                                    },
                                })}
                                isInvalid={!!errors.password}
                            />
                            {errors.password && (
                                <Text color="red.500" fontSize="sm">
                                    {errors.password.message}
                                </Text>
                            )}
                        </Box>
                    </Stack>
                    <Button
                        colorScheme="blackAlpha"
                        mt={6}
                        w="full"
                        size="lg"
                        type="submit"
                        isLoading={mutation.isPending}
                    >
                        Войти
                    </Button>
                </form>
                <Text textAlign="center" mt={6}>
                    Нет аккаунта?{" "}
                    <Link to="/auth/register">
                        <Text as="span" color="blue.500" _hover={{ textDecoration: 'underline' }}>
                            Зарегистрироваться
                        </Text>
                    </Link>
                </Text>
            </Box>
        </Box>
    );
}
