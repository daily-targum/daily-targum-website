import { styleHelpers } from '../utils';

export function GlobalCSS() {
  return (
    <style jsx global>
      {`
        .force-dark-mode {  
          ${styleHelpers.darkTheme()}
        }

        *:focus .showOnFocus {
          opacity: 1;
        }
    
        * {
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
    
        *[id] {
          scroll-margin-top: 65px;
        }
    
        img {
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          -ms-user-drag: none;
          user-drag: none;
        }
    
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        span { 
          padding: 0;
          margin: 0;
        }
    
        a {
          color: var(--colors-accent_main);
        }
    
        .hide-scrollbars::-webkit-scrollbar {
          display: none;
        }
    
        .hide-scrollbars {
          scrollbar-width: none;
          overflow: -moz-scrollbars-none;
        }
    
        .accessibility-outline {
          outline: 1px dotted #212121;
          outline: 5px auto -webkit-focus-ring-color;
        }
      `}
    </style>
  );
}

GlobalCSS.Vars = Vars;
function Vars() {
  return (
    <style jsx global>
      {`
        :root {
          ${styleHelpers.lightTheme()}
        }
        
        .force-dark-mode {  
          ${styleHelpers.darkTheme()}
        }
        
        @media only screen {
          .dark-mode {
            ${styleHelpers.darkTheme()}
          }
        }
    
        html,
        body {
          padding: 0;
          margin: 0;
          color: var(--text-color);
          background-color: var(--colors-background_light);
        }
      `}
    </style>
  )
}

export default GlobalCSS;