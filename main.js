import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { UsersApp } from './src/users/users-app';

document.querySelector('#app').innerHTML = `
  <div>
   
    <div class="card">
      
    </div>
  </div>
`;

const element = document.querySelector('.card');

UsersApp(element);


