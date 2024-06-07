// eslint-disable-next-line @nx/enforce-module-boundaries
import { UpdateUserDto } from './../../../../shared/dtos/update-user.dto'
/* eslint-disable @nx/enforce-module-boundaries */

import axios from 'axios'
import { MessageType } from '../dtos/message-type'
import { Department, User } from '@prisma/client'
import { UserAndDepartment } from '../dtos/users-and-department'
import { CreateUserDto } from '../../../../shared/dtos/create-user.dto'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

export const registerEmployee = async (
    data: CreateUserDto
): Promise<MessageType> => {
    try {
        const response = await axios
            .post(`${BASE_URL}/user/register`, data, {
                headers: {
                    'ngrok-skip-browser-warning': true,
                },
            })
            .then((response) => response.data)

        return { message: response.message, type: 'success' } as MessageType
    } catch (error) {
        return { message: 'User already exists', type: 'error' } as MessageType
    }
}

export const updateEmployee = async (
    data: UpdateUserDto
): Promise<MessageType<UserAndDepartment>> => {
    try {
        const response = await axios
            .patch(`${BASE_URL}/user/${data.id}`, data, {
                headers: {
                    'ngrok-skip-browser-warning': true,
                },
            })
            .then((response) => {
                return response
            })

        if (response.status !== 200) {
            return {
                message: response.data.message,
                type: 'error',
            } as MessageType
        }

        return {
            message: 'User updated with success',
            data: response.data.user,
            type: 'success',
        }
    } catch (error) {
        return {
            message: 'Internal Server Errors',
            type: 'error',
        } as MessageType
    }
}

export const findEmployees = async ({
    currentPage,
    itemsPerPage,
}: {
    currentPage: number
    itemsPerPage: number
}): Promise<MessageType<{ users: UserAndDepartment[]; count: number }>> => {
    const indexOfFirstItem = currentPage * itemsPerPage - itemsPerPage

    const response = await axios
        .get(`${BASE_URL}/user?skip=${indexOfFirstItem}&take=${itemsPerPage}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':
                    'GET,PUT,POST,DELETE,PATCH,OPTIONS',

                'ngrok-skip-browser-warning': true,
            },
        })
        .then((response) => {
            return response
        })

    if (response.status !== 200) {
        return { message: response.data.message, type: 'error' } as MessageType
    }

    return {
        data: { users: response.data.users, count: response.data.count },
        type: 'success',
    }
}

export const findEmployee = async (id: number): Promise<MessageType<User>> => {
    const response = await axios
        .get(`${BASE_URL}/user/${id}`)
        .then((response) => {
            return response
        })

    if (response.status !== 200) {
        return { message: response.data.message, type: 'error' }
    }

    return { data: response.data.user, type: 'success' }
}

export const deleteEmployee = async (
    id?: number
): Promise<MessageType<void>> => {
    const response = await axios
        .delete(`${BASE_URL}/user/${id}`)
        .then((response) => {
            return response
        })

    if (response.status !== 200) {
        return { message: response.data.message, type: 'error' }
    }

    return { message: response.data.message, type: 'success' }
}

export const findDepartments = async (): Promise<MessageType<Department[]>> => {
    const response = await axios
        .get(`${BASE_URL}/department`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':
                    'GET,PUT,POST,DELETE,PATCH,OPTIONS',

                'ngrok-skip-browser-warning': true,
            },
        })
        .then((response) => {
            return response
        })

    if (response.status !== 200) {
        return { message: response.data.message, type: 'error' }
    }

    return {
        data: response.data.departments,
        type: 'success',
    }
}

export const findDepartmentsHistory = async ({
    currentPage,
    itemsPerPage,
    userId,
}: {
    currentPage: number
    itemsPerPage: number
    userId?: number
}): Promise<
    MessageType<{ department: { id: string; name: string }; date: Date }[]> & {
        count: number
    }
> => {
    const indexOfFirstItem = currentPage * itemsPerPage - itemsPerPage

    const response = await axios
        .get(
            `${BASE_URL}/department/${userId}/history?skip=${indexOfFirstItem}&take=${itemsPerPage}`,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods':
                        'GET,PUT,POST,DELETE,PATCH,OPTIONS',

                    'ngrok-skip-browser-warning': true,
                },
            }
        )
        .then((response) => {
            return response
        })

    return {
        data: response.data.history,
        type: 'success',
        count: response.data.count,
    }
}
