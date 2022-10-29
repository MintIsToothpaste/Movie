import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './Components/Pages/MainPage'
import ContentCardWithEvent from './Components/Molecules/ContentCardWithEvent';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
