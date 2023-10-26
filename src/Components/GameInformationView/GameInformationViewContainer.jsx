import styled from 'styled-components'
import GameInformationView from './GameInformationView';

const Containerbox = styled.div`
    width: 100%;
`


const EmailPwFoundContainer = () => {
  return (
    <Containerbox>
      <GameInformationView  />
    </Containerbox>
  );
}

export default EmailPwFoundContainer;