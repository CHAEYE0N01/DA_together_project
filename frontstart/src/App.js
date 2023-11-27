import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import styled from "styled-components";
// Pages
import MainPage from './component/page/MainPage';
import EmotionAnalysis from './component/page/EmotionAnalysis';
import BookViewPage from './component/page/BookViewPage';

const MainTitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<MainPage />} />
                <Route path="emotion-analysis" element={<EmotionAnalysis />} />
                <Route path="book-view" element={<BookViewPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;