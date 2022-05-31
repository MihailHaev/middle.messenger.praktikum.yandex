import { getTemplateFromRoute } from './lib/router';

import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = getTemplateFromRoute(location.pathname);
});