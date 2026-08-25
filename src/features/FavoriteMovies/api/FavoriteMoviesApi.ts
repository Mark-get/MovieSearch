export type favoriteResponse = {
    status: {
        status_code: string
        status_message: string
    }
}

export type bodyParam = {
    mediaType: "movie" | "t-v"
    mediaId: number
    favorite: boolean
}

export type favoriteParams = {
    session_id?: string
}