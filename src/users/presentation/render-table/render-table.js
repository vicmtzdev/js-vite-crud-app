import usersStore from '../../store/users-store';
import { deleteUserById } from '../../use-cases/delete-user-by-id';
import { showModal } from '../render-modal/render-modal';
import './render-table.css';

let table;

const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;
    const tableBody = document.createElement('tbody');
    table.append(tableHeaders, tableBody);
    return table;

}

/**
 * 
 * @param {MouseEvent} event 
 */
const tableSelectListener = (event) => {

    const element = event.target.closest('.select-user');
    if (!element) return;

    const id = element.getAttribute('data-id');
    showModal(id);

}

/**
 * 
 * @param {MouseEvent} event 
 */
const tableDeleteListener = async (event) => {

    const element = event.target.closest('.delete-user');
    if (!element) return;

    const id = element.getAttribute('data-id');
    try {

        await deleteUserById(id);
        await usersStore.reloadPage();
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable();

    } catch (error) {

        console.log(error);
        alert('No se pudo eliminar');

    }

}


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = (element) => {

    const users = usersStore.getUsers();

    if (!table) {
        table = createTable();
        element.append(table);

        // TODO: Listeners a la table
        table.addEventListener('click', tableSelectListener);
        table.addEventListener('click', tableDeleteListener);
    }

    let tableHTML = '';
    users.forEach(user => {
        tableHTML += `
        <tr>
            <td>${user.id}</td>
            <td>${user.balance}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.isActive}</td>
            <td>

                <a class="img1" href="#/"><img class="select-user" data-id="${user.id}" src="./src/assets/edit.svg"></img></a>
                <a class="img2" href="#/"><img class="delete-user" data-id="${user.id}" src="./src/assets/x.svg"></img></a>

            </td>
        </tr>
        `
    });

    table.querySelector('tbody').innerHTML = tableHTML;

}