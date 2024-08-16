import { createFileRoute } from '@tanstack/react-router';
import { Outlet, Link as RouterLink } from '@tanstack/react-router';
import {
    Box,
    Flex,
    Avatar,
    Button,
    Link,
    VStack,
    Text,
    IconButton,
    Divider,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
} from '@chakra-ui/react';
import { FiHome, FiUser, FiSettings, FiHelpCircle, FiLogOut } from 'react-icons/fi';
import styles from './_layout.module.scss';
import {PanelsTopLeft} from "lucide-react";

export const Route = createFileRoute('/dashboard/_layout')({
    component: DashboardLayout,
});

function DashboardLayout() {
    return (
        <Flex minH="100vh">
            {/* Aside */}
            <Box as="aside" w="250px" bg="white" borderRight="1px solid #E2E8F0" p={6} className={styles.aside}>
                <Box mb={8} textAlign="center">
                    <Text fontSize="2xl" fontWeight="bold">
                        Site<span style={{
                            background: "#2F6FED",
                            color: "#fff",
                            borderRadius: 4,
                            padding: "2px 6px",
                            marginLeft: 2,
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                        }}>Blox</span>
                    </Text>
                </Box>
                <VStack align="start" spacing={4}>
                    <Link
                        as={RouterLink}
                        to="/dashboard/projects"
                        className={styles.navLink}
                        borderRadius={8}
                        _hover={{
                            background: 'brand.100',
                            textDecoration: 'none',
                            color: "brand.700"
                        }}
                        _activeLink={{
                            background: 'brand.100',
                            color: "brand.700"
                        }}
                    >
                        <div className={styles.line}></div>
                        <PanelsTopLeft className={styles.icon} size={20} /> <Text ml={2}>Dashboard</Text>
                    </Link>
                    <Link
                        as={RouterLink}
                        to="/dashboard/home"
                        className={styles.navLink}
                        borderRadius={8}
                        _hover={{
                            background: 'brand.100',
                            textDecoration: 'none',
                            color: "brand.700"
                        }}
                        _activeLink={{
                            background: 'brand.100',
                            color: "brand.700"
                        }}
                    >
                        <div className={styles.line}>

                        </div>
                        <FiHome className={styles.icon}/> <Text ml={2}>Home</Text>
                    </Link>
                </VStack>
            </Box>

            {/* Main Content */}
            <Flex direction="column" flex="1">
                {/* Header */}
                <Box as="header" w="full" bg="white" p={4} borderBottom="1px solid #E2E8F0" boxShadow="sm">
                    <Flex justify="end" align="center">
                        <Button colorScheme='info' variant="solid" boxShadow="md" mr={4} _hover={{ boxShadow: "lg" }}>
                            Upgrade to Pro
                        </Button>

                        <Popover>
                            <PopoverTrigger>
                                <IconButton
                                    icon={<Avatar size="sm" />}
                                    variant="ghost"
                                    aria-label={''}
                                />
                            </PopoverTrigger>
                            <PopoverContent w="200px">
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Account</PopoverHeader>
                                <PopoverBody>
                                    <Text mb={2}>Hello, User!</Text>
                                    <Divider my={2} />
                                    <VStack align="start" spacing={2}>
                                        <Link
                                            as={RouterLink}
                                            to="/dashboard/settings"
                                            display="flex"
                                            alignItems="center"
                                            _hover={{ color: 'info.600' }}
                                        >
                                            <FiSettings /> <Text ml={2}>Settings</Text>
                                        </Link>
                                        <Link
                                            as={RouterLink}
                                            to="/dashboard/profile"
                                            display="flex"
                                            alignItems="center"
                                            _hover={{ color: 'info.600' }}
                                        >
                                            <FiUser /> <Text ml={2}>Profile</Text>
                                        </Link>
                                        <Link
                                            as={RouterLink}
                                            to="/logout"
                                            display="flex"
                                            alignItems="center"
                                            _hover={{ color: 'danger.700' }}
                                        >
                                            <FiLogOut /> <Text ml={2}>Logout</Text>
                                        </Link>
                                    </VStack>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Flex>
                </Box>

                {/* Main Content Area */}
                <Box as="main" p={6} bg="gray.50" flex="1" borderRadius="md" boxShadow="lg">
                    <Outlet />
                </Box>
            </Flex>
        </Flex>
    );
}
