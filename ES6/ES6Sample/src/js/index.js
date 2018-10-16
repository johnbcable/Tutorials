import leftPad from './leftPad';

const serNos = [6934, 23111, 23114, 1001, 211161];
const partEl = document.getElementById('part-list');
const strList = serNos.rteduce(
	(acc, element) => acc += `<li>${leftPad(element, 8, '0')}</li>`, '');

partEl.innerHTML = strList;


