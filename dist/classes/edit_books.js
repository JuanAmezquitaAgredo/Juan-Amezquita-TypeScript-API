var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class EditBooks {
    constructor(token, id, title, author, description, summary, publicationDate) {
        this.token = token;
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.summary = summary;
        this.publicationDate = publicationDate;
    }
    editBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            };
            const reqOptions = {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(book)
            };
            const url = `http://190.147.64.47:5155/api/v1/books/${this.id}`;
            const result = yield fetch(url, reqOptions);
            if (result.status !== 200) {
                throw new Error("Conexion fallida");
            }
            else if (result.status === 200) {
                alert("Libro editado");
            }
        });
    }
    takeDataBook() {
        const dialog = document.querySelector('dialog');
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
        const form = dialog.querySelector('form');
        form.elements.namedItem('title').value = this.title;
        form.elements.namedItem('author').value = this.author;
        form.elements.namedItem('description').value = this.description;
        form.elements.namedItem('summary').value = this.summary;
        form.elements.namedItem('publicationDate').value = this.publicationDate;
        form.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const title = form.elements.namedItem('title').value;
            const author = form.elements.namedItem('author').value;
            const description = form.elements.namedItem('description').value;
            const summary = form.elements.namedItem('summary').value;
            const publicationDate = form.elements.namedItem('publicationDate').value;
            console.log(title, author, description, summary, publicationDate);
            const book = {
                title: title,
                author: author,
                description: description,
                summary: summary,
                publicationDate: publicationDate
            };
            yield this.editBook(book);
            location.reload();
        }));
        const cancel = dialog.querySelector('#cancel');
        cancel.addEventListener('click', () => {
            dialog.close();
        });
    }
}
