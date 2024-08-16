'use client'

import { useMutation } from '@tanstack/react-query';
import axios, {AxiosError, AxiosResponse} from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {JSX, SVGProps, useState} from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {useRouter} from "next/navigation";


const schema = yup.object().shape({
    email: yup.string().email('Неверный формат email').required('Email обязателен'),
    password: yup.string().min(6, 'Пароль должен быть минимум 6 символов').required('Пароль обязателен'),
});

interface FormData {
    email: string;
    password: string;
}

interface ErrorData {
    code: number | undefined;
    message: string | undefined;
}

async function LogIn(data: FormData): Promise<AxiosResponse> {
    return axios.post("/auth/login", data);
}

export default function Component() {
    const router = useRouter()

    const [error, setError] = useState<ErrorData>({code: 0, message: ""})

    const mutation = useMutation<AxiosResponse, AxiosError, FormData>({
        mutationFn: (data: FormData) => LogIn(data),
        onSuccess: async (data: AxiosResponse) => {
            router.push("/dashboard")
        },
        onError: async (error: AxiosError) => {
            // TODO: i18n в будущем, в ответе будет идти код от туда, на разные языки
            setError({
                code: error.response?.status,
                message: error.response?.data?.error,
            })
        },
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            mutation.mutate(values);
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen">
            <AlertDialog open={error.code != 0}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Error {error.code}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {error.message}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        {/*<AlertDialogCancel>Cancel</AlertDialogCancel>*/}
                        <AlertDialogAction onClick={() => {
                            formik.resetForm()
                            setError({code: 0, message: ""})
                        }}>Try again</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <form onSubmit={formik.handleSubmit} className="mx-auto max-w-[480px] space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Welcome back!</h1>
                    <p className="text-muted-foreground">Enter your email and password to access your account.</p>
                </div>
                <div className="space-y-4">
                    <div className="grid gap-4">
                        <Button variant="outline">
                            <ChromeIcon className="mr-2 h-4 w-4"/>
                            Sign in with Google
                        </Button>
                        <Button variant="outline">
                            <InstagramIcon className="mr-2 h-4 w-4"/>
                            Sign in with Instagram
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"/>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <Button type="submit" className="w-full" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Signing In...' : 'Sign In'}
                    </Button>
                    {mutation.isError && (
                        <div className="text-red-500 text-center">
                            {/*{mutation.error?.response?.data?.message || 'Login failed'}*/}
                        </div>
                    )}
                    <div className="text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href={"/auth/register"} className="underline" prefetch={false}>
                            Register
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}


function ChromeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="4"/>
            <line x1="21.17" x2="12" y1="8" y2="8"/>
            <line x1="3.95" x2="8.54" y1="6.06" y2="14"/>
            <line x1="10.88" x2="15.46" y1="21.94" y2="14"/>
        </svg>
    )
}


function InstagramIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
    )
}