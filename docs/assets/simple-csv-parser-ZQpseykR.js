(function(){"use strict";self.onmessage=s=>{const{id:f,text:i,delimiter:t}=s.data;try{const e=t??c(i),n=l(i,e),r={id:f,ok:!0,data:n};self.postMessage(r)}catch(e){const n={id:f,ok:!1,error:e.message};self.postMessage(n)}};function c(s){return s.includes("	")?"	":s.includes(";")?";":","}function l(s,f=","){const i=[];let t=[],e="",n=!1;for(let r=0;r<s.length;r++){const o=s[r],u=s[r+1];if(o==='"'&&n&&u==='"'){e+='"',r++;continue}if(o==='"'&&!n&&e===""){n=!0;continue}if(o==='"'&&n){if(u&&u!==f&&u!==`
`&&u!=="\r")throw new Error("Invalid CSV");n=!1;continue}if(!n&&o===f){t.push(e),e="";continue}if(!n&&(o===`
`||o==="\r")){t.push(e),i.push(t),t=[],e="",o==="\r"&&u===`
`&&r++;continue}e+=o}if(n)throw new Error("Unterminated quoted field");return(e.length||t.length)&&(t.push(e),i.push(t)),i}})();
