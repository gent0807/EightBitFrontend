import { styled } from 'styled-components';
import Router from './Router';

const Main = () => {
 
  return (
    <FooterSet>
    <Router/>
    </FooterSet>
  );
}

export default Main;

const FooterSet = styled.div
`
  min-height: calc(100% - 120px);
  @media (min-width:250px) and (max-width:480px)
    {
        width: 480px;
    }
`