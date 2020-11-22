import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *,
    *::after,
    *::before{
        box-sizing:border-box;
        margin:0;
        padding:0;
        font-family: 'Nanum Myeongjo', serif;
    }
    *:focus{
        outline:none;
    }
    body{
        overflow-x:hidden;
        background-color:#f4f4f4;
    }
`;

export default GlobalStyle;
