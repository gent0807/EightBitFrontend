import SelectSignInput from './SelectSignInput';
import styled from 'styled-components'

let Containerbox = styled.div`
    margin: 0 auto;
    max-width: 460px;
    padding: 267px 0px 54px 0px;
    @media (min-width:250px) and (max-width:666px)
    {
        padding: 358px 0px 54px 0px;
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