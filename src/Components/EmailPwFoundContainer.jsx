import styled from 'styled-components'
import EmailPwFound from './EmailPwFound';

let Containerbox = styled.div`
    margin: auto;
    max-width: 460px;
    padding: 54px 0px 54px 0px;
`


const EmailPwFoundContainer = () => {
  return (
    <Containerbox>
      <EmailPwFound/>
    </Containerbox>
  );
} 

export default EmailPwFoundContainer;