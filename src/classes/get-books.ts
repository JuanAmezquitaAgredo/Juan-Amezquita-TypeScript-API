import { IResponseBooks,Result } from "../interfaces/IBooks.js";
import { DeleteBooks } from "./delete_books.js";
import { EditBooks } from "./edit_books.js";
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
                    <button class="edit">Editar</button>
                    <button class="delete">Eliminar</button>
                </div>
                `;
                content.appendChild(div);

                const deleteButton = div.querySelector('.delete') as HTMLButtonElement;
                const editButton = div.querySelector('.edit') as HTMLButtonElement;
                const spinner = document.getElementById('loading-spinner') as HTMLDialogElement;

                deleteButton.addEventListener('click', async ()=>{
                    if(confirm('Estas seguro de eliminar este libro?')){
                        spinner.showModal();
                        const deleteBooks = new DeleteBooks(this.token);

                        try{
                            await deleteBooks.deleteBook(book.id);
                            location.reload();
                        }catch(error){
                            console.log(error);
                        }finally{
                            spinner.close();
                        }
                    };
                });

                editButton.addEventListener('click', ()=>{
                    const editBooks = new EditBooks(this.token,book.id,book.title,book.author,book.description,book.summary,book.publicationDate);
                    editBooks.takeDataBook();
                });

        
            });
        }
    }
}