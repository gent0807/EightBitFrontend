import styled from 'styled-components'
import EmailPwFound from './EmailPwFound';

let Containerbox = styled.div`
    margin: auto;
    max-width: 506px;
    padding: 56px 20px 54px;
`


const EmailPwFoundContainer = () => {
  return (
    <Containerbox>
      <EmailPwFound/>
    </Containerbox>
  );
} 

export default EmailPwFoundContainer;