var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class CreateBooks {
    constructor(token) {
        this.token = token;
    }
    createBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            };
            const reqOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(book)
            };
            const url = `http://190.147.64.47:5155/api/v1/books`;
            const result = yield fetch(url, reqOptions);
            if (result.status !== 201) {
                throw new Error("Conexion fallida");
            }
            else if (result.status === 201) {
                alert("Libro creado");
                console.log(result.status);
            }
        });
    }
    takeDataBook() {
        const dialog = document.querySelector('#dialog_add');
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
        const form = dialog.querySelector('form');
        const spinner = document.querySelector('#loading-spinner');
        form.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            spinner.showModal();
            const title = form.elements.namedItem('title').value;
            const author = form.elements.namedItem('author').value;
            const description = form.elements.namedItem('description').value;
            const summary = form.elements.namedItem('summary').value;
            const publicationDate = form.elements.namedItem('publicationDate').value;
            const book = {
                title: title,
                author: author,
                description: description,
                summary: summary,
                publicationDate: publicationDate
            };
            try {
                yield this.createBook(book);
                location.reload();
            }
            catch (error) {
                console.error('Error creating book:', error);
            }
            finally {
                spinner.close();
                dialog.close();
            }
        }));
        const cancel = dialog.querySelector('#cancel');
        cancel.addEventListener('click', () => {
            dialog.close();
        });
    }
}
