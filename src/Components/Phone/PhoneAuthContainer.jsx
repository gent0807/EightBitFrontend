import PhoneAuth from './PhoneAuth';
import styled from 'styled-components'

let Containerbox = styled.div`
    margin: auto;
    max-width: 460px;
    padding: 235px 0px 54px 0px;
    @media (min-width:250px) and (max-width:480px)
    {
      padding: 394px 0px 54px 0px;
    }
`

const Phone = () => {

    return (
      <Containerbox>
        <PhoneAuth />
      </Containerbox>
    );
}

export default Phone;