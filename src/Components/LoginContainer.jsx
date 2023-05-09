import '../CSS/Login.css';
import Logininput from './Logininput';
import styled from 'styled-components'

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