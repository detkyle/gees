import styled from "styled-components";

const colors = {
  green: "#4caf50",
  red: "#ff0000",
  yellow: "#ffff00"
};

const Button = styled.button`
  background-color: ${props => colors[props.color]};
  border: none;
  color: white;
  padding: 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 1px 1px;
  cursor: pointer;
  border-radius: 8px;
  font-weight: bold;
`;

export default Button;
