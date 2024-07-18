import { IResponseBooks, Result } from "../interfaces/IBooks";


export class DeleteBooks{
    constructor(private token: string){}
    async deleteBook(id:string) {
        const headers: Record<string, string>={
            'Content-Type':'application/json',
            'Authorization':`Bearer ${this.token}`
        }

        const reqOptions: RequestInit = {
            method: 'DELETE',
            headers: headers,
        }

        const url = `http://190.147.64.47:5155/api/v1/books/${id}`
        const result = await fetch(url,reqOptions);

        if(result.status !== 200){
            throw new Error("Conexion fallida");
        }
    }
}