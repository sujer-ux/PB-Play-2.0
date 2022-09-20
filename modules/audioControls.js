let   img = document.querySelector('.image'),
      trackName = document.querySelector('.track'),
      bt = document.querySelector('.bt'),
      artName = document.querySelector('.art'),
      current = document.querySelector('.current'),
      duration = document.querySelector('.duration'),
      range = document.querySelector('.timeRange'),
      volBtn = document.querySelector('.vol'),
      volWrap = document.querySelector('.volWrap'),
      volEv = document.querySelector('.setVol'),
      volMove = document.querySelector('.toVol'),
      volValue = document.getElementsByClassName('value'),
      muteBtn = document.querySelector('.mute');


let SongID = 0;
let audio = new Audio(base.song[SongID]);


bt.addEventListener('click', function(e) {
    let btn = e.target;
      
    if (btn.classList.contains('play')) {
        if (audio.paused) {
            play(audio);
        } else {
            audio.pause();
            btn.classList.remove('played');
        }
    } else if (btn.classList.contains('next')) {
        switcher(SongID + 1);
    } else if (btn.classList.contains('prew')) {
        switcher(SongID - 1);
    } else if (btn.classList.contains('repeat')) {
        
        
    } else if (btn.classList.contains('vol')) {
        
        
    }
    
    
    function switcher(id) {
        SongID = id;
        if (SongID > base.trackItem.length - 1) {
            SongID = 0;
        } else if (SongID < 0) {
            SongID = base.trackItem.length - 1;
        }
        progress.style.width = '0%';
        trackName.innerHTML = '';
        artName.innerHTML = '';
        loadMeta('play');
    }
})

function loadMeta(toPlay) {
    //change audio
    audio.src = base.song[SongID];
    
    //if play
    if (toPlay === 'play') {
        play(audio);
    };
    
    //preload images
    let i = SongID;
    while (i < SongID + 3) {
        let image = new Image();
        image.src = base.image[i];
        i++
    }
    
    
    //change image
    let image = new Image();
    image.src = base.image[SongID];
    image.addEventListener('load', function() {
        img.append(image);
    });
    if (toPlay === 'play') {
        img.childNodes[1].style.opacity = '0';
        setTimeout(() => {
            img.childNodes[1].remove()
        },200);
    }
    
    
    //change text
    trackName.innerHTML = base.trackItem[SongID];
    artName.innerHTML = base.trackArtst[SongID];
    
    
    //change audio time
    duration.innerHTML = '00:00';
    audio.addEventListener('loadedmetadata', function() {
        current.innerHTML = '00:00';
        duration.innerHTML = formatted(audio.duration);
    })
                           
    
    //text to centre
    textAnim();
}

function play(audio) {
    audio.play();
    bt.childNodes[5].classList.add('played');
}

audio.onended = function() {
    stop(audio);
}

function stop(elem) {
    elem.pause();
    elem.currentTime = 0;
    bt.childNodes[5].classList.remove('played');
    progress.style.transition = 'all 0.2s';
    
    setTimeout(() => {
        progress.style.transition = null;
    }, 200);
}

function formatted(input) {
    let timeStamp = input;
    let minutes = Math.floor(timeStamp / 60);
    let seconds = Math.floor(timeStamp % 60);
    let formatted = [
        minutes.toString().padStart (2, '0'),
        seconds.toString().padStart (2, '0')
    ].join(':');
    return formatted;
}

volBtn.addEventListener('pointerover', function(e) {
    volWrap.style.height = '102px';
    volWrap.style.opacity = 1;
})

volBtn.addEventListener('pointerout', hideBlock)

function hideBlock(e) {
    volWrap.style.height = '0px';
    volWrap.style.opacity = 0;
}


var back = 1;
let volH = volEv.offsetHeight;
let wheelV = 0;
volEv.addEventListener('pointerdown', function(e) {
    setVome(e);
    volBtn.removeEventListener('pointerout', hideBlock);
    document.addEventListener('pointermove', setVome);
    document.addEventListener('pointerup', pup);
    document.querySelector('body').classList.add('un-select');
    
    function pup(e) {
        document.removeEventListener('pointermove', setVome);
        document.querySelector('body').classList.remove('un-select');
        volBtn.addEventListener('pointerout', hideBlock);
        if (audio.volume >= 1) {
            back = audio.volume;
        }
        
        let check = e.target != volMove && e.target != volBtn && e.target != volValue[0] && e.target != volValue[1] && e.target != volWrap;
        if (check) {
            hideBlock(e);
        }
        
        setTimeout(function() {
            document.removeEventListener('pointerup', pup);
            
        })
    }
});

function setVome(e) {
    let offsY = 97 - (e.pageY - volEv.getBoundingClientRect().y),
        setH = minMax((100 * offsY) / volH, 0, 100);
    
    volMove.style.height = setH + '%';
    audio.volume = setH / 100;
    wheelV = 1000 - (setH * 10);
    
    if (audio.volume == 0) {
        volBtn.classList.add('muted');
    } else {
        volBtn.classList.remove('muted');
    }
    
    let i = 0;
    while (i < volValue.length) {
        volValue[i].innerHTML = Math.ceil(setH);
        i++
    }
}

if (volBtn.addEventListener) {
    if ('onwheel' in document) {
        volBtn.addEventListener("wheel", onWheel);
    } else if ('onmousewheel' in document) {
        volBtn.addEventListener("mousewheel", onWheel);
    } else {
        volBtn.addEventListener("MozMousePixelScroll", onWheel);
    }
    } else {
        volBtn.attachEvent("onmousewheel", onWheel);
    }

muteBtn.addEventListener('click', function() {
    if (audio.volume == 0) {
        audio.volume = back;
        volBtn.classList.remove('muted');
        volMove.style.height = back * 100 + '%';
        let i = 0;
        while (i < volValue.length) {
            volValue[i].innerHTML = Math.ceil(back*100);
            i++
        }
    } else {
        back = audio.volume;
        audio.volume = 0;
        volBtn.classList.add('muted');
        volMove.style.height = 0 + '%';
        let i = 0;
        while (i < volValue.length) {
            volValue[i].innerHTML = Math.ceil(0);
            i++
        }
    }
    
})

function onWheel(e) {
    e = e || window.event;
    let delta = e.deltaY || e.detail || e.wheelDelta;
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    
    wheelV = minMax(wheelV + delta, 0, 1000);
    let crate = wheelV / 10;
    
    let setH;
    if (wheelV > 0) {
        setH = minMax(100 - crate, 0, 100);
    } else {
        setH = minMax(100 - (crate + crate), 0, 100);
    }
    
    volMove.style.height = setH + '%';
    audio.volume = setH / 100;
    
    let i = 0;
    while (i < volValue.length) {
        volValue[i].innerHTML = Math.ceil(minMax(setH, 0, 100));
        i++
    }
    
    if (audio.volume >= 1) {
        back = audio.volume;
    }
}

window.onload = loadMeta;










