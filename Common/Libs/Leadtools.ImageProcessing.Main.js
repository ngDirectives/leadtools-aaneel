/**************************************************
LEADTOOLS (C) 1991-2016 LEAD Technologies, Inc. ALL RIGHTS RESERVED.
This software is protected by United States and International copyright laws.
Any copying, duplication, deployment, redistribution, modification or other
disposition hereof is STRICTLY PROHIBITED without an express written license
granted by LEAD Technologies, Inc.. This notice may not be removed or otherwise
altered under any circumstances.
Portions of this product are licensed under US patent 5,327,254 and foreign
counterparts.
For more information, contact LEAD Technologies, Inc. at 704-332-5532 or visit
https://www.leadtools.com
**************************************************/
// Leadtools.ImageProcessing.Main.js
// Version:19.0.0.3
onmessage=function(e){Leadtools_ImageProcessing_Main_Main(e)};
Leadtools_ImageProcessing_Main_Main=function(e){if(!e)throw Error("'eventIn' must not be null");var a=e,d=null;e.data?(a=e.data,d=postMessage):d=a.callback;if(!a.imageData)throw Error("'imageData' must not be null");if(!d)throw Error("'callback' must not be null");if(void 0==a.imageData.width||void 0==a.imageData.height)a.imageData.width=a.width,a.imageData.height=a.height;switch(a.command){case "Flip":Leadtools_ImageProcessing_Main_Flip(a,d);break;case "Reverse":Leadtools_ImageProcessing_Main_Reverse(a,
d);break;case "Fill":Leadtools_ImageProcessing_Main_Fill(a,d);break;default:throw Error("Unrecognized image processing command: "+a.command);}};Leadtools_ImageProcessing_Main_Fill=function(e,a){for(var d=e.imageData,n=e.useProgress,f=e.color,m=f>>24&255,k=f>>16&255,l=f>>8&255,f=f&255,j=d.data,h=j.length,c=0,i=!1,b=0;b<h&&!i;b+=4)if(j[b]=k,j[b+1]=l,j[b+2]=f,j[b+3]=m,n){var g=Math.round(100*b/h);g>c&&(c=g,g={status:"Progress",percentage:g},a(g),g.abort&&(i=!0))}a&&!i&&a({status:"Completed",imageData:d})};
Leadtools_ImageProcessing_Main_Flip=function(e,a){for(var d=e.imageData,n=e.useProgress,f=d.data,m=0,k=!1,l=d.height,j=0,h=4*d.width,c=0,i=(l-1)*h;c<i&&!k;){for(var b=0;b<h;b++){var g=f[c+b];f[c+b]=f[i+b];f[i+b]=g}c+=h;i-=h;j++;n&&(b=Math.round(200*j/l),b>m&&(m=b,b={status:"Progress",percentage:b},a(b),b.abort&&(k=!0)))}a&&!k&&a({status:"Completed",imageData:d})};
Leadtools_ImageProcessing_Main_Reverse=function(e,a){for(var d=e.imageData,n=e.useProgress,f=d.data,m=0,k=!1,l=d.width,j=d.height,h=0;h<j&&!k;h++){for(var c=0;c<l/2&&!k;c++)for(var i=4*h*l+4*c,b=4*(h+1)*l-4*(c+1),g=0;4>g;g++){var o=f[i+g];f[i+g]=f[b+g];f[b+g]=o}n&&(c=Math.round(100*h/j),c>m&&(m=c,c={status:"Progress",percentage:c},a(c),c.abort&&(k=!0)))}a&&!k&&a({status:"Completed",imageData:d})};
