import { BooksControllers } from "./classes/login-class.js";
function main() {
    //** Login */
    const username = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    document.addEventListener('submit', async (e:Event)=>{
        e.preventDefault();
        const booksControllers = new BooksControllers('http://190.147.64.47:5155/','api/v1/auth/login');
        let token:string = await booksControllers.postLogin({email:`${username.value}`,password:`${password.value}`});
        if(token){
            window.location.href = 'pages/dashboard.html';
        }
    });
}

main();