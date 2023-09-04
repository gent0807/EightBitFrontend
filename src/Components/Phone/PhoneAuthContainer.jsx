import { useParams } from 'react-router-dom';
import PhoneAuth from './PhoneAuth';
import styled from 'styled-components'

const Containerbox = styled.div`
    margin: 0 auto;
    max-width: 460px;
    padding: 267px 0px 54px 0px;
    @media (min-width:250px) and (max-width:666px)
    {
        padding: 358px 0px 54px 0px;
    }
`

const Phone = () => {
    return (
      <Containerbox>
        <PhoneAuth/>
      </Containerbox>
    );
}

export default Phone;