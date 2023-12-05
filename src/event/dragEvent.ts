import { getElementById } from '../utils/getElement';

interface IgetDragAfterElement {
  (container: HTMLElement, y: number): HTMLElement;
}

interface IdragEvent {
  (listArr: HTMLLIElement[], container: HTMLElement): void;
}

/**
 *마우스의 위치를 전달 받아 현재 마우스가 가리키고 있는 element를 반환하는 함수
 * @param container {HTMLElement} 드래그된 아이템이 있는 요소를 찾기 위한 root element
 * @param y {number} 마우스의 높이 값
 * @returns 현재 마우스가 위치한 element
 */
export const getDragAfterElement: IgetDragAfterElement = (container, y) => {
  const draggableElements = [...Array.from(container.querySelectorAll('.list_item:not(.dragging)'))];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        child.classList.add('drop_target');
        return { offset: offset, element: child };
      } else {
        child.classList.remove('drop_target');
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY, element: undefined },
  ).element;
};

/**
 * 드래그 완료 시 실행되는 이벤트
 * @param listArr {HTMLLIElement[]} 드래그된 element 값을 갱신하기 위한 arr
 * @param container {HTMLElement} 이벤트를 부여하기 위한 root element
 */
export const dragEvent: IdragEvent = (listArr, container) => {
  // todolist 내부에서 드랍 한 경우 afterElement의 앞에 드래그 아이템을 삽입하기 위한 이벤트
  container.addEventListener('mouseup', (e) => {
    const afterElement = getDragAfterElement(container, e.clientY);
    const currentDraggable = document.querySelector('.dragging');

    if (currentDraggable) {
      container.insertBefore(currentDraggable, afterElement);
      currentDraggable.classList.remove('dragging');
    }
  });
};

/**
 * 드래그 중일 때 마우스의 위치에 있는 element에 가이드 정보를 노출하기 위한 이벤트
 */
export const addDropTargetEvent = () => {
  window.addEventListener('mousemove', (e) => {
    const currentDraggable = document.querySelector('.dragging');
    if (currentDraggable === null) return;

    const container = getElementById<HTMLUListElement>('list_box');

    getDragAfterElement(container, e.clientY);
  });
};
