import SelectSignInput from './SelectSignInput';
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

const SelectSign = () => {

    return (
      <Containerbox>
        <SelectSignInput />
      </Containerbox>
    );
}

export default SelectSign;