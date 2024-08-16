"use client"

import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";
import React, { useState, ReactNode } from "react";
import axios from "axios";
import {ChakraProvider} from "@chakra-ui/react";

interface ProviderProps {
    children: ReactNode;
}

export default function Provider({ children }: ProviderProps): JSX.Element {
    const [queryClient] = useState(() => new QueryClient());
    axios.defaults.withCredentials = true
    axios.defaults.baseURL = "http://localhost:5000"
    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ChakraProvider>
);
}
