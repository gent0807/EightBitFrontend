import Signinput from './Signinput';
import styled from 'styled-components'

let Containerbox = styled.div`
    margin: auto;
    max-width: 460px;
    padding: 54px 0px 54px 0px;
`

const SignContainer = () => {

    return (
      <Containerbox>
        <Signinput />
      </Containerbox>
    );
}

export default SignContainer;