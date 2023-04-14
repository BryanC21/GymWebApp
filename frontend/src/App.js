import React from 'react';
import Home from './components/Home';
import AddClasses from './components/AddClasses';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeePage from './components/EmployeePage';
//import store from './store';
//import { Provider } from 'react-redux';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/add-classes" element={<AddClasses />} />
                <Route path="/Employee" element={<EmployeePage />} />

            </Routes>
        </BrowserRouter>
    );
}

/*
function App() {
    return (
        <Provider store={store} >
            <BrowserRouter>
                <URLPaths />
            </BrowserRouter>
        </Provider>
    );
}
*/
export default App;
