import TopNavBar from './Header/TopNavBarContainer';
import Login from './Login/LoginContainer';
import Sign from './Sign/SignContainer';
import EmailPwFound from './EmailPwFound/EmailPwFoundContainer';
import PhoneAuth from './Phone/PhoneAuthContainer';
import SelectSign from "./Phone/SelectSignContainer";
import Board from "./Board/BoardContainer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from "./Footer/Footer";
import NotFound from "./ErrorPage/NotFound";
import WriteBoard from "./WriteBoard/WriteBoardContainer";
import Article from "./Articles/ArticleContainer";
import UpdateBoard from "./UpdateBoard/UpdateBoardContainer";
import Center from "./Center/CenterContainer";
import OfficialGame from "./OfficialGame/OfficialGameContainer";
import AllGamePage from "./AllGame/AllGamePageContainer";
import GameInformationView from "./GameInformationView/GameInformationViewContainer";
import GameUploadPage from "./GameUploadPage/GameUploadPageContainer";

const Router = () => {

    return (
        <BrowserRouter>
            <TopNavBar />
            <Routes>
                <Route element={<Footer />} >
                    <Route path="/Board/:contentType/:depth" element={<Board />} />
                    <Route path="/" element={<Center />} />
                    <Route path="/Article/:writer/:regdate/:contentType/:depth" element={<Article />} />
                    <Route path="/GameInformationView/:id" element={<GameInformationView />} />
                    <Route path="/GameUploadPage" element={<GameUploadPage />} />
                </Route>
                    <Route path="/OfficialGame" element={<OfficialGame />} />
                    <Route path="/AllGamePage" element={<AllGamePage />} />
                    <Route path="/WriteBoard/:contentType/:depth" element={<WriteBoard />} />
                    <Route path="/UpdateBoard/:contentType/:depth" element={<UpdateBoard />} />
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

