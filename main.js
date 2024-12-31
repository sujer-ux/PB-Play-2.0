const MAIN = document.querySelector('.main'),
      PEAPER = document.querySelector('.peaper'),
      names = document.getElementsByClassName('name'),
      trackList = document.querySelector('.bottom'),
      simpleBarS = document.querySelector('.simplebar-content-wrapper');


let peaperH = PEAPER.clientHeight;



function at(n) {
    n = Math.trunc(n) || 0;
    if (n < 0) n += this.length;
    if (n < 0 || n >= this.length) return undefined;
    return this[n];
}

const TypedArray = Reflect.getPrototypeOf(Int8Array);
for (const C of [Array, String, TypedArray]) {
    Object.defineProperty(C.prototype, "at",
                          { value: at,
                            writable: true,
                            enumerable: false,
                            configurable: true });
}





simpleBarS.addEventListener('scroll', function() {
    let setH = peaperH - simpleBarS.scrollTop;
    
    function step() {
        function setS(n) { PEAPER.style.maxHeight = n + 'px'};
        if (setH <= 50) {
            setH = 50;
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
            names[i].style.left = '40px';
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






