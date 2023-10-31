import TopNavBar from './Components/Header/TopNavBarContainer';
import Login from './Components/Login/LoginContainer';
import Sign from './Components/Sign/SignContainer';
import EmailPwFound from './Components/EmailPwFound/EmailPwFoundContainer';
import PhoneAuth from './Components/Phone/PhoneAuthContainer';
import SelectSign from "./Components/Phone/SelectSignContainer";
import Board from "./Components/Board/BoardContainer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from "./Components/Footer/Footer";
import NotFound from "./Components/ErrorPage/NotFound";
import WriteBoard from "./Components/WriteBoard/WriteBoardContainer";
import Article from "./Components/Articles/ArticleContainer";
import UpdateBoard from "./Components/UpdateBoard/UpdateBoardContainer";
import Center from "./Components/Center/CenterContainer";
import OfficialGame from "./Components/OfficialGame/OfficialGameContainer";
import AllGamePage from "./Components/AllGame/AllGamePageContainer";
import GameInformationView from "./Components/GameInformationView/GameInformationViewContainer";
import GameUploadPage from "./Components/GameUploadPage/GameUploadPageContainer";

const Router = () => {

    return (
        <BrowserRouter>
            <TopNavBar />
            <Routes>
                <Route element={<Footer />} >
                    <Route path="/Board/:contentType" element={<Board />} />
                    <Route path="/" element={<Center />} />
                    <Route path="/Article/:writer/:regdate/:contentType" element={<Article />} />
                    <Route path="/GameInformationView/:id" element={<GameInformationView />} />
                    <Route path="/GameUploadPage" element={<GameUploadPage />} />
                </Route>
                    <Route path="/OfficialGame" element={<OfficialGame />} />
                    <Route path="/AllGamePage" element={<AllGamePage />} />
                    <Route path="/WriteBoard/:contentType" element={<WriteBoard />} />
                    <Route path="/UpdateBoard/:contentType" element={<UpdateBoard />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Sign" element={<Sign />} />
                    <Route path="/SelectSign" element={<SelectSign />} />
                    <Route path="/PhoneAuth" element={<PhoneAuth />} />
                    <Route path="/EmailPwFound" element={<EmailPwFound />} />
                    <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;

