import usersStore from "../../store/users-store";
import './render-buttons.css';


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = (element) => {

    const nextButton = document.createElement('button');
    nextButton.innerText = '>';

    const prevButton = document.createElement('button');
    prevButton.innerText = '<';

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerText = usersStore.getCurrentPage();

    element.append(prevButton, currentPageLabel, nextButton);


}