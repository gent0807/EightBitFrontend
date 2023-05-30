import Logininput from './Logininput';
import styled from 'styled-components'

let Containerbox = styled.div`
    margin: auto;
    max-width: 460px;
    padding: 267px 0px 54px 0px;
    @media (min-width:250px) and (max-width:512px)
    {
        padding: 505px 0px 54px 0px;
    }
`


const LoginContainer = () => {
  return (
    <Containerbox>
      <Logininput/>
    </Containerbox>
  );
} 

export default LoginContainer;