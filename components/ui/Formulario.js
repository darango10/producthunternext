import styled from "@emotion/styled";

export const Formulario = styled.form`
  max-width: 600px;
  width: 95%;
  margin: 5rem auto 0 auto;
  
  fieldset{
    margin: 2rem 0;
    border: 3px solid #e1e1e1;
    font-size: 2rem;
    padding: 2rem;
    border-radius: 30px;

  }
`

export const Campo = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  
  label{
    flex: 0 0 150px;
    font-size: 1.8rem;    
  }
  
  input, textarea{
    flex: 1;
    padding: 1rem;
    border-radius: 30px;
    border: 1px solid var(--gris3);
    }
    
    textarea{
      height: 400px;
    }
    
    input:focus, input.form-control:focus {

     outline:none !important;
     outline-width: 0 !important;
     box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }
  
`

export const InputSubmit = styled.input`
  background-color: var(--naranja);
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: #FFF;
  font-size: 1.8rem;
  text-transform: uppercase;
  border-radius: 50px;
  border: 1px solid white;
  font-family: 'PT Sans',serif;
  font-weight: 700;
  margin-bottom: 5rem;
  
  &:hover{
    cursor: pointer;
  }
`

export const Error = styled.p`
  background-color: red;
  padding: 1rem;
  font-family: 'PT-Sans', sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  color: #FFF;
  text-align: center;
  text-transform: uppercase;
  margin: 2rem 0;
`