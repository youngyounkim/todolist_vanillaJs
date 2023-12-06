import { fireEvent } from '@testing-library/dom';

import render from './testUtils/render';
import document from './testUtils/document';

import { addListItem } from '../utils/setListElement';
import { addSubmitEvent } from '../event/submitEvent';
import { addCompletedListEvent, addSelectListItemEvent } from '../event/listEvent';
import { addSortingListEvent } from '../event/sortEvent';
import { getElementByClassName } from '../utils/getElement';

render(`<section class="list_wrap">
<form id="input_form">
  <input id="to_do_input" placeholder="Create your schedule" />
</form>
<span class="button_wrap">
  <button class="sorting_button seleted_BTN">All</button>
  <button class="sorting_button">Active</button>
  <button class="sorting_button">Completed</button>
</span>
<ul id="list_box"></ul>
<div class="completed_wrap">
  <button id="completed_button">Clear Completed</button>
</div>
</section>`);

const listArr: HTMLLIElement[] = [];

const listBox = document.getElementById('list_box') as HTMLUListElement;
const input = document.getElementById('to_do_input') as HTMLInputElement;
const completedButton = document.getElementById('completed_button') as HTMLButtonElement;
const sortingBtn = getElementByClassName('sorting_button');

describe('submit event 테스트', () => {
  input.value = 'todo';

  addSubmitEvent(listArr, addListItem, listBox);

  test('submit input 초기화 테스트', () => {
    fireEvent.submit(input);

    expect(input.value).toEqual('');
  });

  test('todolist 리스트 배열 추가 테스트', () => {
    const listItem = listArr[0];
    expect(listItem.textContent.indexOf('todo')).not.toEqual(-1);
  });

  test('todolist ul 추가 테스트', () => {
    expect(listBox.firstElementChild.textContent.indexOf('todo')).not.toEqual(-1);
  });
});

describe('list click 테스트', () => {
  addSelectListItemEvent(listArr, listBox);

  test('list 클릭 시 완료 상태로 전환 테스트', () => {
    const item = listBox.firstElementChild;
    fireEvent.mouseDown(item);
    fireEvent.mouseUp(item);

    expect(item.className.indexOf('selected')).not.toEqual(-1);
  });

  test('삭제 버튼 클릭 테스트', () => {
    const childNode = listBox.childNodes;
    const item = listBox.firstElementChild;
    const button = item.lastElementChild;

    fireEvent.mouseDown(button);
    fireEvent.mouseUp(button);

    let isDelete = true;
    Array.from(childNode).forEach((el) => {
      if (el === item) isDelete = false;
    });

    expect(isDelete).toEqual(true);
  });
});

describe('button sorting 테스트', () => {
  addSortingListEvent(listArr, sortingBtn);

  for (let i = 0; i < 5; i++) {
    input.value = `todo ${i}`;

    fireEvent.submit(input);
  }

  test('진행중 버튼 클릭 시 진행중인 아이템이 출력되는지 테스트', () => {
    const item = listBox.firstElementChild;
    fireEvent.mouseDown(item);
    fireEvent.mouseUp(item);

    fireEvent.click(sortingBtn[1]);

    let isSelect = true;

    Array.from(listBox.childNodes).forEach((el: HTMLLinkElement) => {
      if (el.className.indexOf('selected') !== -1) {
        isSelect = false;
      }
    });

    expect(listBox.childNodes.length === 3 && isSelect).toBeTruthy;
  });

  test('진행중인 todo 클릭 시 완료 되어 진행중 리스트에서 제거되는 이벤트', () => {
    const item = listBox.firstElementChild;
    fireEvent.mouseDown(item);
    fireEvent.mouseUp(item);

    expect(listBox.childNodes.length).toEqual(1);
  });

  test('진행완료 버튼 클릭 시 진행 완료된 아이템이 정상적으로 노출되는지 확인하는 테스트', () => {
    fireEvent.click(sortingBtn[2]);

    let isSelect = true;

    Array.from(listBox.childNodes).forEach((el: HTMLLinkElement) => {
      if (el.className.indexOf('selected') === -1) {
        isSelect = false;
      }
    });

    expect(listBox.childNodes.length === 2 && isSelect).toBeTruthy;
  });
});

describe('완료 아이템 제거 테스트', () => {
  addCompletedListEvent(listArr, completedButton);

  test('complete 버튼을 클릭 할 때 제거가 잘 되는지 확인하는 테스트', () => {
    fireEvent.click(completedButton);
    fireEvent.click(sortingBtn[0]);
    expect(listBox.childNodes.length).toEqual(1);
  });
});
