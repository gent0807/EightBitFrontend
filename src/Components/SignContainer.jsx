import '../CSS/Sign.css';
import Signinput from './Signinput';
import styled from 'styled-components'

let Containerbox = styled.div`
    margin: auto;
    max-width: 460px;
    padding: 56px 20px 54px;
`

const SignContainer = () => {

    return (
      <Containerbox>
        <Signinput />
      </Containerbox>
    );
}

export default SignContainer;