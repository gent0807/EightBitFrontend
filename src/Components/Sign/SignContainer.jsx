import Signinput from './Signinput';
import styled from 'styled-components'

let Containerbox = styled.div`
    margin: auto;
    max-width: 460px;
    padding: 346px 0px 54px 0px;
    @media (min-width:250px) and (max-width:512px)
    {
        padding: 505px 0px 54px 0px;
    }
`

const SignContainer = () => {

    return (
      <Containerbox>
        <Signinput />
      </Containerbox>
    );
}

export default SignContainer;