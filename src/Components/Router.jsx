import TopNavBar from './Header/TopNavBarContainer';
import Login from './Login/LoginContainer';
import Sign from './Sign/SignContainer';
import EmailPwFound from './EmailPwFound/EmailPwFoundContainer';
import PhoneAuth from './Phone/PhoneAuthContainer';
import SelectSign from "./Phone/SelectSignContainer";
import FreeBoard from "./FreeBoard/FreeBoardContainer";
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Footer from "./Footer/Footer";
import NotFound from "./ErrorPage/NotFound";
import WriteBoard from "./WriteBoard/WriteBoardContainer";
import FreeArticle from "./Articles/FreeArticleContainer";
import UpdateBoard from "./UpdateBoard/UpdateBoardContainer";
import Center from "./Center/CenterContainer";

const Router = () => {

    return (
        <BrowserRouter>
            <TopNavBar />
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/Sign" element={<Sign />} />
                <Route path="/EmailPwFound" element={<EmailPwFound />} />
                <Route path="/PhoneAuth" element={<PhoneAuth />} />
                <Route path="/SelectSign" element={<SelectSign />} />
                <Route path="/FreeBoard" element={<FreeBoard />} />
                <Route path="/WriteBoard" element={<WriteBoard />} />
                <Route path="/FreeArticle/:writer/:regdate" element={<FreeArticle />} />
                <Route path="/UpdateBoard/:writer/:regdate/:title/:content" element={<UpdateBoard />} />
                <Route path="/" element={<Center />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default Router;

