"use client"

import React from "react";
import Link from "next/link";
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, IconButton, Input, Stack, useDisclosure } from "@chakra-ui/react";
import styles from "./layout.module.scss";
import {ChartBarIcon, HomeIcon, MenuIcon, PackageIcon, SettingsIcon, ShoppingBagIcon, UsersIcon} from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <Box as="aside" className={styles.sidebar}>
                <IconButton
                    aria-label="Open Menu"
                    icon={<MenuIcon />}
                    onClick={onOpen}
                    className={styles.menuButton}
                />
                <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Navigation</DrawerHeader>
                        <DrawerBody>
                            <Stack as="nav" spacing={4}>
                                <Link href="#" passHref>
                                    <Button leftIcon={<HomeIcon />} variant="ghost" w="full">
                                        Dashboard
                                    </Button>
                                </Link>
                                <Link href="#" passHref>
                                    <Button leftIcon={<ShoppingBagIcon />} variant="ghost" w="full">
                                        Orders
                                    </Button>
                                </Link>
                                <Link href="#" passHref>
                                    <Button leftIcon={<PackageIcon />} variant="ghost" w="full">
                                        Products
                                    </Button>
                                </Link>
                                <Link href="#" passHref>
                                    <Button leftIcon={<UsersIcon />} variant="ghost" w="full">
                                        Customers
                                    </Button>
                                </Link>
                                <Link href="#" passHref>
                                    <Button leftIcon={<ChartBarIcon />} variant="ghost" w="full">
                                        Analytics
                                    </Button>
                                </Link>
                                <Link href="#" passHref>
                                    <Button leftIcon={<SettingsIcon />} variant="ghost" w="full">
                                        Settings
                                    </Button>
                                </Link>
                            </Stack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

                <nav>
                    <Link href="#" passHref>
                        <Button as="a" leftIcon={<HomeIcon />} variant="ghost" className={`${styles.navLink} ${styles.active}`} />
                    </Link>
                    <Link href="#" passHref>
                        <Button as="a" leftIcon={<ShoppingBagIcon />} variant="ghost" className={`${styles.navLink} ${styles.inactive}`} />
                    </Link>
                    <Link href="#" passHref>
                        <Button as="a" leftIcon={<PackageIcon />} variant="ghost" className={`${styles.navLink} ${styles.inactive}`} />
                    </Link>
                    <Link href="#" passHref>
                        <Button as="a" leftIcon={<UsersIcon />} variant="ghost" className={`${styles.navLink} ${styles.inactive}`} />
                    </Link>
                    <Link href="#" passHref>
                        <Button as="a" leftIcon={<ChartBarIcon />} variant="ghost" className={`${styles.navLink} ${styles.inactive}`} />
                    </Link>
                </nav>

                <nav className={styles.navBottom}>
                    <Link href="#" passHref>
                        <Button as="a" leftIcon={<SettingsIcon />} variant="ghost" className={`${styles.navLink} ${styles.inactive}`} />
                    </Link>
                </nav>
            </Box>

            {/* Main content area */}
            <Box className={styles.mainContent}>
                {/* Header */}
                <Flex as="header" className={styles.header}>
                    <Input type="search" placeholder="Search..." />
                    <Avatar size="sm" src="/placeholder-user.jpg" />
                </Flex>

                {/* Content */}
                <Box as="main" className={styles.content}>
                    {children}
                </Box>
            </Box>
        </div>
    );
}
