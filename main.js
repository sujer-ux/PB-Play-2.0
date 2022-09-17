const MAIN = document.querySelector('.main'),
      PEAPER = document.querySelector('.peaper'),
      names = document.getElementsByClassName('name'),
      trackList = document.querySelector('.bottom'),
      simpleBarS = document.querySelector('.simplebar-content-wrapper');


let peaperH = PEAPER.clientHeight;

//console.log(MAIN);
//
//simpleBarS.addEventListener('scroll', () => {
//    MAIN.style.backgroundColor = 'red';
//})

simpleBarS.addEventListener('scroll', function() {
    
    let setH = peaperH - simpleBarS.scrollTop;
    function setS(n) { PEAPER.style.height = n + 'px'};
    console.log(MAIN);
    
    function step() {
        if (setH <= 55) {
            setH = 55;
            setS(setH);
            MAIN.classList.add('mini');
            textAnim(true);
        } else {
            setS(setH);
            MAIN.classList.remove('mini');
            textAnim(true);
        }
    }
    window.requestAnimationFrame(step);
    
})

function textAnim(ani) {
    let i = 0;
        
        
    if (MAIN.classList.contains('mini')) {
        while (i < names.length) {
            names[i].style.left = '42px';
            i++;
        }
    } else {
        while (i < names.length) {
            let w = names[i].clientWidth;
            if (w > MAIN.clientWidth) {
                names[i].style.left = '4px';
            } else {
                names[i].style.left = 'calc(50% - ' + w / 2 + 'px)';
            }
            i++;
        }
    }
    if (ani) {
        names[0].style.transition = 'all 0.2s';
        names[1].style.transition = 'all 0.2s';
    } else {
        names[0].style.transition = 'none';
        names[1].style.transition = 'none';
    }
}


window.onload = textAnim;


//document.addEventListener('click', function() {
//    names[0].innerHTML = 'Жизнь';
//    names[1].innerHTML = 'Пионерлагерь gskmyfz hfleuf пыльная радуга';
//    textAnim();
//})














