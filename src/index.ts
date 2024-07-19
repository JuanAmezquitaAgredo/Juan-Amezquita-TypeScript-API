import { CreateBooks } from "./classes/create_books.js";
import { AllBooks } from "./classes/get-books.js";
import { BooksControllers } from "./classes/login-class.js";
function main() {
    //** Login */
    const username = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    if (window.location.pathname === '/dist/index.html') {
        document.addEventListener('submit', async (e:Event)=>{
            e.preventDefault();
            const booksControllers = new BooksControllers('http://190.147.64.47:5155/','api/v1/auth/login');
            let token:string = await booksControllers.postLogin({email:`${username.value}`,password:`${password.value}`});
            if(token){
                localStorage.setItem('token',token);
                window.location.href = 'pages/dashboard.html';
            }
        });
    }

    if(localStorage.getItem('token')){
        const token = localStorage.getItem('token');
        const allBooks = new AllBooks(`${token}`);
        allBooks.getAllBooks().then(
            (books)=>{
                console.log(books);
                allBooks.printAllBooks(books);
            }
        );
    };


    if(window.location.pathname === '/dist/pages/dashboard.html'){
        const closeSession = document.querySelector('.close') as HTMLButtonElement;
        closeSession.addEventListener('click', ()=>{
             localStorage.removeItem('token');
             window.location.href = '/dist/index.html';
        });

        //** Add Book */

        const addBook = document.querySelector('.add_book') as HTMLButtonElement;

        addBook.addEventListener('click', ()=>{
            const token = localStorage.getItem('token');
            const createBooks = new CreateBooks(`${token}`);
            createBooks.takeDataBook();
        });

    }
}

main();