var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class AllBooks {
    constructor(token) {
        this.token = token;
    }
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            };
            const reqOptions = {
                method: 'GET',
                headers: headers,
            };
            const url = 'http://190.147.64.47:5155/api/v1/books';
            const result = yield fetch(url, reqOptions);
            if (result.status !== 200) {
                throw new Error("Conexion fallida");
            }
            const Response = JSON.stringify((yield result.json()));
            const ResponseParse = JSON.parse(Response);
            const Data = ResponseParse.data;
            console.log(Data);
            return Data;
        });
    }
    ;
    printAllBooks(books) {
        const content = document.getElementById('content');
        if (content) {
            books.forEach((book) => {
                const div = document.createElement('div');
                div.classList.add('item');
                div.innerHTML += /*html*/ `
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
