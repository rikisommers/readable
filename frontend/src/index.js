import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom'
import appStore from './store/appStore';
import App from './components/App';


const store = appStore()

const ReadableApp = () => (
<Provider store={store}>
    <BrowserRouter> 
            <App />
    </BrowserRouter>
</Provider>
)

ReactDOM.render(
    <ReadableApp />,
    document.getElementById('root')
);

