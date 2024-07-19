import { IBooks } from "../interfaces/IBooks";


export class CreateBooks {
    constructor(private token: string){
        
    }

    async createBook(book:IBooks) {
        const headers: Record<string, string>={
            'Content-Type':'application/json',
            'Authorization':`Bearer ${this.token}`
        }
        const reqOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(book)
        }
        const url = `http://190.147.64.47:5155/api/v1/books`
        const result = await fetch(url,reqOptions);
        if(result.status !== 201){
            throw new Error("Conexion fallida");
        }
        else if(result.status === 201){
            alert("Libro creado");
            console.log(result.status);
        }
    }

    takeDataBook(){
        const dialog = document.querySelector('dialog') as HTMLDialogElement;
        dialog.innerHTML = /*html*/ `
        <form>
                <h1 style="font-size: 25px">Crear Libro</h1>
                <label for="title" style="margin-top: 10px">Titulo:</label>
                <input type="text" id="title" name="title" required>
                <label for="author" style="margin-top: 10px">Autor:</label>
                <input type="text" id="author" name="author" required>
                <label for="description" style="margin-top: 10px">Descripción:</label>
                <input type="text" id="description" name="description" required>
                <label for="summary" style="margin-top: 10px">Resumen:</label>
                <input type="text" id="summary" name="summary" required>
                <label for="publicationDate" style="margin-top: 10px">Fecha de publicación:</label>
                <input type="date" id="publicationDate" name="publicationDate" required>
                <div class="buttons" style="margin-top: 10px; display: flex; justify-content: space-around;">
                    <button type="submit" style="background-color: #4CAF50">Crear</button>
                    <button type="button" id="cancel" style="background-color: #ff0000">Cancelar</button>
                </div>
            </form>
        `;
        dialog.showModal();
        const form = dialog.querySelector('form') as HTMLFormElement;

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const title = (form.elements.namedItem('title') as HTMLInputElement).value
            const author = (form.elements.namedItem('author') as HTMLInputElement).value
            const description = (form.elements.namedItem('description') as HTMLInputElement).value
            const summary = (form.elements.namedItem('summary') as HTMLInputElement).value
            const publicationDate = (form.elements.namedItem('publicationDate') as HTMLInputElement).value
            const book:IBooks = {
                title: title,
                author: author,
                description: description,
                summary: summary,
                publicationDate: publicationDate
            }
            await this.createBook(book);
            location.reload();
            dialog.close();
        });

        const cancel = dialog.querySelector('#cancel') as HTMLButtonElement;
        cancel.addEventListener('click', ()=>{
            dialog.close();
        });
    }
}
