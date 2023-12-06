/**
 * @jest-environment jsdom
 */

import { setElement } from '../utils/setElement';
import { getElementById, getElementByClassName } from '../utils/getElement';
import { addListItem } from '../utils/setListElement';
import render from './testUtils/render';

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

describe('setutil 함수 테스트', () => {
  test('element 생성 테스트 케이스', () => {
    const el = setElement('li');
    expect(el).toEqual(document.createElement('li'));
  });
});

describe('getutil 함수 테스트', () => {
  test('getElementById 함수 테스트', () => {
    const el = getElementById<HTMLElement>('to_do_input');
    expect(el.getAttribute('id')).toEqual('to_do_input');
  });

  test('getElementByClassName 함수 테스트', () => {
    const el = getElementByClassName('button_wrap');
    expect(el[0].getAttribute('class')).toEqual('button_wrap');
  });
});

const listArr: HTMLLIElement[] = [];
const listBox = document.getElementById('list_box') as HTMLUListElement;

describe('setList 함수 테스트', () => {
  test('addListItem 생성 테스트 케이스', () => {
    addListItem('test', listArr, listBox);
    const childNodes = listBox.childNodes;

    childNodes[0].textContent;
    expect(childNodes[0].textContent.indexOf('test')).not.toEqual(-1);
  });
});
