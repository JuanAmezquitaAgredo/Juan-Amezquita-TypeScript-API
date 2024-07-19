var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CreateBooks } from "./classes/create_books.js";
import { AllBooks } from "./classes/get-books.js";
import { BooksControllers } from "./classes/login-class.js";
function main() {
    //** Login */
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    if (window.location.pathname === '/dist/index.html') {
        document.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const booksControllers = new BooksControllers('http://190.147.64.47:5155/', 'api/v1/auth/login');
            let token = yield booksControllers.postLogin({ email: `${username.value}`, password: `${password.value}` });
            if (token) {
                localStorage.setItem('token', token);
                window.location.href = 'pages/dashboard.html';
            }
        }));
    }
    if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        const allBooks = new AllBooks(`${token}`);
        allBooks.getAllBooks().then((books) => {
            console.log(books);
            allBooks.printAllBooks(books);
        });
    }
    ;
    if (window.location.pathname === '/dist/pages/dashboard.html') {
        const closeSession = document.querySelector('.close');
        closeSession.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = '/dist/index.html';
        });
        //** Add Book */
        const addBook = document.querySelector('.add_book');
        addBook.addEventListener('click', () => {
            const token = localStorage.getItem('token');
            const createBooks = new CreateBooks(`${token}`);
            createBooks.takeDataBook();
        });
    }
}
main();
