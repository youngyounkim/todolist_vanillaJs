import { getElementByClassName, getElementById } from '../utils/getElement';
import { renderList } from '../utils/renderList';
import { handleRenderingSortingItem } from './sortEvent';

interface IgetDragAfterElement {
  (container: HTMLElement, y: number): HTMLElement;
}

interface IdragEvent {
  (listArr: HTMLLIElement[], listBox: HTMLElement): void;
}

interface IaddDropTargetEvent {
  (listArr: HTMLLIElement[], listBox: HTMLElement): void;
}

/**
 *마우스의 위치를 전달 받아 현재 마우스가 가리키고 있는 element를 반환하는 함수
 * @param container {HTMLElement} 드래그된 아이템이 있는 요소를 찾기 위한 root element
 * @param y {number} 마우스의 높이 값
 * @returns 현재 마우스가 위치한 element
 */

let previewTimeout;

export const getDragAfterElement: IgetDragAfterElement = (container, y) => {
  const draggableElements = [...Array.from(container.querySelectorAll('.list_item:not(.dragging)'))];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY, element: undefined },
  ).element;
};

/**
 * 드래그 완료 시 실행되는 이벤트
 * @param listArr {HTMLLIElement[]} 드래그된 element 값을 갱신하기 위한 arr
 * @param listBox {HTMLElement} 이벤트를 부여하기 위한 root element
 */
export const dragEvent: IdragEvent = (listArr, listBox) => {
  // todolist 내부에서 드랍 한 경우 afterElement의 앞에 드래그 아이템을 삽입하기 위한 이벤트

  listBox.addEventListener('mouseup', (e) => {
    const afterElement = getDragAfterElement(listBox, e.clientY);
    const currentDraggable = document.querySelector('.dragging');
    clearTimeout(previewTimeout);
    if (currentDraggable && afterElement !== currentDraggable) {
      // 드랍 대상에 element 이동
      listBox.insertBefore(currentDraggable, afterElement);

      // 이동한 순서대로 listArr 갱신
      const moveElemntIdx = listArr.indexOf(currentDraggable as HTMLLIElement);
      listArr.splice(moveElemntIdx, 1);
      const targetIdx = listArr.indexOf(afterElement as HTMLLIElement);
      listArr.splice(targetIdx, 0, currentDraggable as HTMLLIElement);

      listArr.map((el) => {
        el.classList?.remove('drop_target');
      });

      currentDraggable.classList.remove('dragging');
    }
  });

  // listbox 외부에서 이벤트 실행 시 li class 이름 초기화
  document.addEventListener('mouseup', () => {
    const selectedBTN = getElementByClassName('seleted_BTN');
    listArr.map((el) => {
      el.classList?.remove('drop_target', 'dragging');
    });
    clearTimeout(previewTimeout);
    handleRenderingSortingItem(listArr, selectedBTN[0] as HTMLButtonElement);
  });
};

/**
 * 드래그 중일 때 마우스의 위치에 있는 element에 가이드 정보를 노출하기 위한 이벤트
 */

export const addDropTargetEvent: IaddDropTargetEvent = (listArr, listBox) => {
  const handlePreview = (listBox, afterElement, currentDraggable) => {
    previewTimeout = setTimeout(() => {
      listBox.insertBefore(currentDraggable, afterElement);
    }, 2000);
  };

  listBox.addEventListener('mousemove', (e) => {
    const currentDraggable = listBox.querySelector('.dragging');
    if (currentDraggable === null) return;

    const target = getDragAfterElement(listBox, e.clientY);
    clearTimeout(previewTimeout);
    if (currentDraggable !== target) {
      handlePreview(listBox, target, currentDraggable);
    }

    listArr.map((el) => {
      el.classList?.remove('drop_target');
    });

    if (target?.textContent) target.classList?.add('drop_target');
  });
};
