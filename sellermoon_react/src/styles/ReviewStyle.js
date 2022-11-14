import styled from "styled-components";

export const STARDIV = styled.div`
  margin: 0 auto;

  & svg {
    color: #c4c4c4;
    cursor: pointer;
  }
  :hover svg {
    color: #ffca28;
  }
  & svg:hover ~ svg {
    color: #c4c4c4;
  }
  .yellow {
    color: #ffca28;
  }
`;

export const PLUSBTN = styled.button`
  border: none;
  color: gray;
  background-color: transparent;
`;

export const STARSPAN = styled.span`
  color: #ffca28;
  font-size: 25px;
`;
