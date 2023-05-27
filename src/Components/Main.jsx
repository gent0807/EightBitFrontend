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
    min-height: 100%;
    position: relative;
`