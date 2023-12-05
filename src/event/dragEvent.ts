import { getElementById } from '../utils/getElement';

export const getDragAfterElement = (container, y) => {
  const draggableElements = [...container.querySelectorAll('.list_item:not(.dragging)')];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect(); //해당 엘리먼트에 top값, height값 담겨져 있는 메소드를 호출해 box변수에 할당
      const offset = y - box.top - box.height / 2; //수직 좌표 - top값 - height값 / 2의 연산을 통해서 offset변수에 할당
      if (offset < 0 && offset > closest.offset) {
        // (예외 처리) 0 이하 와, 음의 무한대 사이에 조건
        child.classList.add('drop_target');
        return { offset: offset, element: child }; // Element를 리턴
      } else {
        child.classList.remove('drop_target');
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY },
  ).element;
};

export const dragEvent = (arr) => {
  const container = getElementById<HTMLUListElement>('list_box');

  container.addEventListener('mouseup', (e: any) => {
    const afterElement = getDragAfterElement(container, e.clientY); //(결국 드래그하여 마지막 영역의 엘리먼트를 반환합니다.)
    const currentDraggable = document.querySelector('.dragging'); //현재 내가 잡은 엘리먼트

    if (currentDraggable) {
      container.insertBefore(currentDraggable, afterElement); //마지막까지 드래그한 엘리먼트 앞에 현재 내가 잡은 엘리먼트를 삽입 합니다.
      currentDraggable.classList.remove('dragging');
    }
  });
};
