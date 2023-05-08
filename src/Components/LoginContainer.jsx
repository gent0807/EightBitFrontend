import '../CSS/Login.css';
import styled from 'styled-components'
import Logininput from './Logininput';

let Containerbox = styled.div`
    margin: auto;
    max-width: 460px;
    padding: 56px 20px 54px;
`


const LoginContainer = () => {
  return (
    <Containerbox>
      <Logininput/>
    </Containerbox>
  );
} 

export default LoginContainer;