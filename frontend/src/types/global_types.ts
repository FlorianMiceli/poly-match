export type uuid = string

export type User = {
    id: uuid
    first_name: string
    last_name: string
    instagram_username: string
    school_year: string
    school_major: string
    profile: UserProfile
}

export type UserProfile = {
    fav_songs?: Song[]
    fav_artists?: Artist[]
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

// MusicBrainz API types

export type Song = {
    id: uuid
    title: string
    'artist-credit': ArtistCredit[]
    releases: Release[]
}

export type ArtistCredit = {
    name: string
    artist: Artist
}

export type Artist = {
    id: uuid
    name: string
}

export type Release = {
    id: uuid
    title: string
    date: string
    'artist-credit': ArtistCredit[]
}


