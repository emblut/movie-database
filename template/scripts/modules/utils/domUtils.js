function getElement(selector) {
  return document.querySelector(selector);
}

function createElement(tagname) {
  return document.createElement(tagname);
}

function appendElement(parent, child) {
  parent.append(child);
}

function getElementsArr(idsToGet) {
  let elements = [];
  idsToGet.forEach((id) => {
    elements.push(getElement(id));
  });
  return elements;
}

export { getElement, createElement, appendElement, getElementsArr };
