import {createFileRoute} from '@tanstack/react-router'

import {
    ChakraProvider,
    Box,
    Button,
    Input,
    Heading,
    Stack,
    Textarea,
    Select,
    FormControl,
    FormLabel,
    Text
} from '@chakra-ui/react';
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from '@chakra-ui/react'
import {Switch} from '@chakra-ui/react'

export const Route = createFileRoute('/dashboard/_layout/home')({
    component: () => <div>
        <ExamplePage/>
    </div>
})


function ExamplePage() {
    return (
        <Box maxW="md" mx="auto" mt={10} p={6} bg="white" borderRadius="md" boxShadow="lg">
            <Heading mb={6} textAlign="center" color="text.700">
                Пример Страницы
            </Heading>
            <Stack spacing={4}>
                {/* Input Field */}
                <FormControl>
                    <FormLabel color="text.700">Ваше Имя</FormLabel>
                    <Input placeholder="Введите ваше имя" focusBorderColor="primaryAccent.500"/>
                </FormControl>

                {/* Email Field */}
                <FormControl>
                    <FormLabel color="text.700">Email</FormLabel>
                    <Input type="email" placeholder="Введите ваш email" focusBorderColor="info.500"/>
                </FormControl>

                {/* Textarea */}
                <FormControl>
                    <FormLabel color="text.700">Сообщение</FormLabel>
                    <Textarea placeholder="Введите ваше сообщение" focusBorderColor="secondaryAccent.500"/>
                </FormControl>

                {/* Select Field */}
                <FormControl>
                    <FormLabel color="text.700">Выбор Опции</FormLabel>
                    <Select placeholder="Выберите опцию" focusBorderColor="success.500">
                        <option value="option1">Опция 1</option>
                        <option value="option2">Опция 2</option>
                        <option value="option3">Опция 3</option>
                    </Select>
                </FormControl>

                {/* Buttons */}
                <Button colorScheme="info" variant="solid">
                    Отправить
                </Button>
                <Button colorScheme="danger" variant="outline">
                    Удалить
                </Button>
                <Button colorScheme="info" variant="ghost">
                    Узнать больше
                </Button>

                {/* Slider */}
                <Slider aria-label='slider-ex-1' defaultValue={30}>
                    <SliderTrack>
                        <SliderFilledTrack/>
                    </SliderTrack>
                    <SliderThumb/>
                </Slider>

                {/*    Switch*/}
                <FormControl display='flex' alignItems='center'>
                    <FormLabel htmlFor='email-alerts' mb='0'>
                        Enable email alerts?
                    </FormLabel>
                    <Switch colorScheme='secondaryAccent.900' id='email-alerts'/>
                    <Switch colorScheme='secondaryAccent.50' id='email-alerts'/>
                    <Switch colorScheme='secondaryAccent.700' id='email-alerts'/>
                </FormControl>
            </Stack>
        </Box>
    );
}