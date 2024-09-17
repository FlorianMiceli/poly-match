export type uuid = string

export type User = {
    id: uuid
    first_name: string
    last_name: string
    instagram_username: string
    school_year: string
    school_major: string
}

export type UserCreationForm = {
    first_name: string
    last_name: string
    instagram_username: string
    school_year: string
    school_major: string
    email: string
    password: string
}