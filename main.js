const MAIN = document.querySelector('.main'),
      PEAPER = document.querySelector('.peaper'),
      names = document.getElementsByClassName('name'),
      trackList = document.querySelector('.bottom'),
      simpleBarS = document.querySelector('.simplebar-content-wrapper');


let peaperH = PEAPER.clientHeight;

function at(n) {
    // ToInteger() abstract op
    n = Math.trunc(n) || 0;
    // Allow negative indexing from the end
    if (n < 0) n += this.length;
    // OOB access is guaranteed to return undefined
    if (n < 0 || n >= this.length) return undefined;
    // Otherwise, this is just normal property access
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
    function setS(n) { PEAPER.style.height = n + 'px'};
    
    function step() {
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



function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (simpleBarS.pageYOffset) return simpleBarS.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (simpleBarS.documentElement && simpleBarS.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (simpleBarS.scrollTop) return simpleBarS.scrollTop;
    return 0;
}


function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}


function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}


document.querySelector('.avatar').addEventListener('click', smoothScroll('fix-scrll'));









