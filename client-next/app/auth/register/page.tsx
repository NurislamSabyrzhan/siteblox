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
import {ChromeIcon, InstagramIcon} from "lucide-react";



const schema = yup.object({
    email: yup.string()
        .email("Неправильный формат email")
        .required("Email обязателен"),
    password: yup.string()
        .min(8, "Пароль должен быть не менее 8 символов")
        .required("Пароль обязателен"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], "Пароли должны совпадать")
        .required("Подтверждение пароля обязательно"),
});
interface FormData {
    email: string;
    password: string;
}

interface ErrorData {
    code: number | undefined;
    message: string | undefined;
}

async function SignUp(data: FormData): Promise<AxiosResponse> {
    return axios.post("/auth/register", data);
}

export default function Component() {
    const router = useRouter()

    const [error, setError] = useState<ErrorData>({code: 0, message: ""})

    const mutation = useMutation<AxiosResponse, AxiosError, FormData>({
        mutationFn: (data: FormData) => SignUp(data),
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
            confirmPassword: '',
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
                            autocomplete="email"
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
                            autocomplete="new-password"
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            autocomplete="new-password"
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className="text-red-500">{formik.errors.confirmPassword}</div>
                        ) : null}
                    </div>
                    <Button type="submit" className="w-full" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Signup...' : 'Sign Up'}
                    </Button>
                    {mutation.isError && (
                        <div className="text-red-500 text-center">
                            {/*{mutation.error?.response?.data?.message || 'Login failed'}*/}
                        </div>
                    )}
                    <div className="text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href={"/auth/login"} className="underline" prefetch={false}>
                            Login
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}