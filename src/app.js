import fetchData from './app-internals/fetchData';
import form from './app-internals/form';

// web components' import
import './components/hello-world';
import './components/demo-component';
import './components/model-chooser';
import './components/model-viewer';
import './lit-components/lit-hello-world';

const appElement = document.getElementById('app');

appElement.innerHTML = `
  
  <lit-hello-world name="Geetha Yarra"></lit-hello-world>
  <demo-component 
    title="This is Lab 1 Web Component"
    image-src="https://png.pngtree.com/templates/sm/20180520/sm_5b01d4ba5d953.jpg">
    
    <p class="notes" slot="notes">This is a demo component</p>
  </demo-component>

  ${form}
  
  <div class="columns">
    <nav class="column">
      <model-chooser limit="4"></model-chooser>
    </nav>
    <section class="column">
      <model-viewer show-details></model-viewer>
    </section>
  </div>
`;

const chooser = appElement.querySelector('model-chooser');
const viewer = appElement.querySelector('model-viewer');
const showDetailsInput = appElement.querySelector('[name=show-details]');
const urlInput = appElement.querySelector('[name=url]');
const limitInput = appElement.querySelector('[name=limit]');

const loadList = () =>
  fetchData(urlInput.value).then(data => (chooser.items = data));

appElement.addEventListener('model-change', event => {
  if (!viewer) return;
  viewer.data = chooser.items[event.detail];
});

showDetailsInput.addEventListener('change', event => {
  const enabled = !!showDetailsInput.value;
  if (enabled) {
    viewer.setAttribute('show-details', '');
  } else {
    viewer.removeAttribute('show-details');
  }
});
urlInput.addEventListener('change', event => {
  loadList();
});
loadList();

limitInput.addEventListener('change', event => {
  // chooser.setAttribute('limit', event.currentTarget.value)
  chooser.limit = event.currentTarget.value;
});
