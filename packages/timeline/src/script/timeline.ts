// import {pageTabs} from "./page-tabs";

export function animeLine(): any
{
    let isAnimated = false;
    // pageTabs('.language-icon .button', '.language-timeline');
    const buttons = document.querySelectorAll('.language-icon .button');
    const lines = document.querySelectorAll('.language-timeline');
    
    activeLine(lines,false,0)
    buttons.forEach(button => {
        button.addEventListener('click', function(){
            activeLine(lines)
        })
    });
}

function activeLine(lines:NodeListOf<Element>, isAnimated=false, timer=100){
    lines.forEach(line => {
        if (line.classList.contains('active')) {
            setTimeout(() => {
                line.classList.remove('idle');
                isAnimated = true;
            }, timer);
        }else{
            line.classList.add('idle');
        }
    });
}