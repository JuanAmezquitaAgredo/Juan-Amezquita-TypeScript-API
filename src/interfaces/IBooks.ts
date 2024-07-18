export interface IResponseBooks{
    message: string,
    data: Result[]
}

export interface Result {
    id: string,
    title: string,
    author: string,
    description: string,
    summary: string,
    publicationDate: string,
    createdBy: string,
    updatedBy: null,
    deletedBy: null,
    createdAt: string,
    updatedAt: string,
    deletedAt: null,
    files: string[]
}