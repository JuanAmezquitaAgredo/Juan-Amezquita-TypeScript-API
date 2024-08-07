import { IBooks } from "../interfaces/IBooks.js";


export class EditBooks{
    constructor(private token: string,private id:string, private title:string, private author:string, private description:string, private summary:string, private publicationDate:string){

    }

    async editBook(book:IBooks) {
        const headers: Record<string, string>={
            'Content-Type':'application/json',
            'Authorization':`Bearer ${this.token}`
        }
        const reqOptions: RequestInit = {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(book)
        }
        const url = `http://190.147.64.47:5155/api/v1/books/${this.id}`
        const result = await fetch(url,reqOptions);
        if(result.status !== 200){
            throw new Error("Conexion fallida");
        }else if(result.status === 200){
            alert("Libro editado");
        }
    }

    takeDataBook(){
        const dialog = document.querySelector('#dialog_edit') as HTMLDialogElement;
        dialog.innerHTML = /*html*/ `
            <form>
                <h1 style="font-size: 25px">Editar Libro</h1>
                <label for="title" style="margin-top: 10px">Titulo:</label>
                <input type="text" id="title" name="title" required>
                <label for="author" style="margin-top: 10px">Autor:</label>
                <input type="text" id="author" name="author" required>
                <label for="description" style="margin-top: 10px">Descripción:</label>
                <input type="text" id="description" name="description" required>
                <label for="summary" style="margin-top: 10px">Resumen:</label>
                <input type="text" id="summary" name="summary" required>
                <label for="publicationDate" style="margin-top: 10px">Fecha de publicación:</label>
                <input type="text" id="publicationDate" name="publicationDate" required>
                <div class="buttons" style="margin-top: 10px; display: flex; justify-content: space-around;">
                    <button type="submit" style="background-color: #4CAF50">Editar</button>
                    <button type="button" id="cancel" style="background-color: #ff0000">Cancelar</button>
                </div>
            </form>
        `;
        dialog.showModal();
        const form = dialog.querySelector('form') as HTMLFormElement;
        const spinner = document.querySelector('#loading-spinner') as HTMLDialogElement;

        (form.elements.namedItem('title') as HTMLInputElement).value = this.title;
        (form.elements.namedItem('author') as HTMLInputElement).value = this.author;
        (form.elements.namedItem('description') as HTMLInputElement).value = this.description;
        (form.elements.namedItem('summary') as HTMLInputElement).value = this.summary;
        (form.elements.namedItem('publicationDate') as HTMLInputElement).value = this.publicationDate;

        form.addEventListener('submit', async (event) => {
            spinner.showModal();
            event.preventDefault();
            const title = (form.elements.namedItem('title') as HTMLInputElement).value
            const author = (form.elements.namedItem('author') as HTMLInputElement).value
            const description = (form.elements.namedItem('description') as HTMLInputElement).value
            const summary = (form.elements.namedItem('summary') as HTMLInputElement).value
            const publicationDate = (form.elements.namedItem('publicationDate') as HTMLInputElement).value
            console.log(title,author,description,summary,publicationDate);
            const book:IBooks = {
                title: title,
                author: author,
                description: description,
                summary: summary,
                publicationDate: publicationDate
            }
            try {
                await this.editBook(book);
                location.reload();
            } catch (error) {
                console.log(error);
            } finally {
                spinner.close();
                dialog.close();
            }
        });

        const cancel = dialog.querySelector('#cancel') as HTMLButtonElement;
        cancel.addEventListener('click', ()=>{
            dialog.close();
        });



    }
}