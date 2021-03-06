import styled from "@emotion/styled";

const Boton = styled.a`
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    border: 1px solid #d1d1d1;
    border-radius: 50px;
    padding: .8rem 2rem;
    margin: 2rem auto;
    background-color: ${props => props.bgColor ? '#DA552F' : 'white'};
    color: ${props => props.bgColor ? 'white' : 'black'};
    
    &:last-of-type{
      margin-right: 0;
    }
    
    &:hover{
    cursor: pointer;
    }
`;

export default Boton;