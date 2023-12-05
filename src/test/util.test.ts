/**
 * @jest-environment jsdom
 */

const { setElement } = require('../utils/setElement.ts');

describe('util 함수 테스트', () => {
  test('element 생성 테스트 케이스', () => {
    const el = setElement('li');
    expect(el).toEqual(document.createElement('li'));
  });
});
