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
    fav_songs?: SpotifyTrack[]
    fav_artists?: SpotifyArtist[]
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

// export type Song = {
//     id: uuid
//     title: string
//     'artist-credit': ArtistCredit[]
//     releases: Release[]
// }

// export type ArtistCredit = {
//     name: string
//     artist: Artist
// }

// export type Artist = {
//     id: uuid
//     name: string
// }

// export type Release = {
//     id: uuid
//     title: string
//     date: string
//     'artist-credit': ArtistCredit[]
// }

// Spotify API types used in database

export type SpotifyArtist = {
    id: string
    name: string
    external_urls: {
        spotify: string
    }
}

export type SpotifyTrack = {
    id: string
    name: string
    album: SpotifyAlbum
    artists: SpotifyArtist[]
    external_urls: {
        spotify: string
    }
    preview_url: string
}

export type SpotifyAlbum = {
    id: string
    name: string
    album_type: string
    artists: SpotifyArtist[]
    images: {
        url: string
        height?: number | undefined
        width?: number | undefined
    }[]
    external_urls: {
        spotify: string
    }
}
