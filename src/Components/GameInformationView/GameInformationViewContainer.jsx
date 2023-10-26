import styled from 'styled-components'
import GameInformationView from './GameInformationView';

const Containerbox = styled.div`
    width: 100%;
    @media (min-width:250px) and (max-width:666px)
    {
        padding: 358px 10px 54px 10px;
    }
`


const EmailPwFoundContainer = () => {
  return (
    <Containerbox>
      <GameInformationView  />
    </Containerbox>
  );
}

export default EmailPwFoundContainer;