# todolist_vanillaJs

# 개요

- to do list를 vanilla js로 구현
- 라이브러리 도움 없이 모든 코드를 직접 구현
- 개발 환경은 webpack을 이용하여 구성

# 폴더 구조

- src

  * css: css 디자인 폴더
  * event : 이벤트 리스너를 이용하여 element에 이벤트를 부여하기 위한 코드
  * test : 테스트 코드
  * utils : 엘리먼트를 생성하거나 부가적인 기능을 추가하는 util 함수

# 구현 사항

- input에 입력받은 정보를 enter 키로 등록하여 to do list에 추가할 수 있도록 구현

  * 추가 될 때 마다 ul에 list element를 생성하여 삽입하는 방식으로 구현
  * 추가 된 아이템은 listArr에 저장하여 sorting 기능에 활용

- list의 아이템을 선택할 때 마다 완료, 미완료 상태로 변경할 수 있도록 구현

  * 이벤트를 ul에 부여하여 자식 li에 전파되도록 구현
  * 제거 버튼을 넣어 리스트 내에서 제거할 수 있도록 구현

- 필터 기능을 제공하여 전체, 완료, 미완료 상태를 필터링 할 수 있도록 탭 버튼 구현

  * 각 버튼 클릭 시 현재 ul에 selected class를 확인하여 필터링 되도록 구현

- 완료 상태의 아이템을 제거할 수 있는 버튼을 제공하여 list를 삭제할 수 있도록 함

  * 리스트에 존재하는 완료 상태의 element를 검색하여 제거한 후 listArr을 갱신하도록 함

- Drag & Drop을 구현하여 list를 이동할 수 있도록 한다.

  * mouse 이벤트 3종 (up, move, down)으로만 구현
  * class를 추가하거나 삭제하는 방식으로 드래그 대상과 위치를 제어하도록 함
  * 이동될 때 마다 listArr을 갱신하도록 함
