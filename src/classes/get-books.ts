import { IResponseBooks,Result } from "../interfaces/IBooks.js";
export class AllBooks{
    constructor(private token: string){}
    async getAllBooks() {
        const headers: Record<string, string>={
            'Content-Type':'application/json',
            'Authorization':`Bearer ${this.token}`
        }
    
        const reqOptions: RequestInit = {
            method: 'GET',
            headers: headers,
        }
    
        const url = 'http://190.147.64.47:5155/api/v1/books'
        const result = await fetch(url,reqOptions);
    
        if(result.status !== 200){
            throw new Error("Conexion fallida");
        }
    
        const Response = JSON.stringify((await result.json()))
        const ResponseParse : IResponseBooks = JSON.parse(Response);
        
        const Data: Result[] = ResponseParse.data;
        console.log(Data);
        return Data;
    };

    printAllBooks(books:Result[]){
        const content = document.getElementById('content')
        if(content){
            books.forEach((book)=>{
                const div = document.createElement('div');
                div.classList.add('item');
            div.innerHTML += /*html*/`
                <h1>${book.title}</h1>
                <h2>${book.author}</h2>
                <p>${book.description}</p>
                <div class="buttons">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            `;
            content.appendChild(div);
            });
        }
        
    }
}