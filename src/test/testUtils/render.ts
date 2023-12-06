import document from './document';

function render(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  const queryByTestId = (testId) => container.querySelector(`[data-testid="${testId}"]`);

  const asFragment = () => document.createRange().createContextualFragment(container.innerHTML);

  document.body.appendChild(container);

  return { container, queryByTestId, asFragment };
}

export default render;
