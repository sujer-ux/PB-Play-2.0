let moveBar = document.querySelector('.moveBlock'),
    hover = document.querySelector('.mouseHover'),
    time = document.querySelector('.hoverTime'),
    progress = document.querySelector('.timeProgress');


let moveW = moveBar.offsetWidth;


audio.addEventListener('timeupdate', timeUpdate);
function timeUpdate() {
    current.innerHTML = formatted(this.currentTime);
}

audio.addEventListener('loadedmetadata', function() {
    durationUpdate();
    audio.addEventListener('timeupdate', durationUpdate);
});


function durationUpdate() {
    duration.innerHTML = `-${formatted(base.duration[SongID] - audio.currentTime)}`;
}

duration.addEventListener('pointerover', function() {
    audio.removeEventListener('timeupdate', durationUpdate);
    duration.innerHTML = formatted(base.duration[SongID]);
});
duration.addEventListener('pointerout', function() {
    audio.addEventListener('timeupdate', durationUpdate);
    duration.innerHTML = `-${formatted(base.duration[SongID] - audio.currentTime)}`;
});


audio.addEventListener('timeupdate', progressUpdate);
function progressUpdate() {
    progress.style.width = (100 * this.currentTime) / this.duration + '%';
}


moveBar.addEventListener('pointerover', () => hover.style.opacity = '1');
moveBar.addEventListener('pointerout', () => hover.style.opacity = '0');

moveBar.addEventListener('pointermove', function(e) {
    let offsX = e.pageX - moveBar.getBoundingClientRect().x,
        setW = (100 * offsX) / moveW;
    
    hover.style.width = minMax(setW, 0, 100) + '%';
});



moveBar.addEventListener('pointerdown', mainF);

function mainF(e) {
    move(e, this);
    timeMove(e);
    time.style.opacity = '1';
    audio.removeEventListener('timeupdate', progressUpdate);
    document.querySelector('body').classList.add('un-select');
    document.addEventListener('pointermove', move);
    document.addEventListener('pointermove', timeMove);
    document.addEventListener('pointerup', reEvents);
    
    function reEvents(e) {
        document.removeEventListener('pointermove', move);
        document.removeEventListener('pointermove', timeMove);
        audio.addEventListener('timeupdate', progressUpdate);
        document.querySelector('body').classList.remove('un-select');
        
        time.style.opacity = '0';
        
        setTime(e);
        
        setTimeout(function() {
            document.removeEventListener('pointerup', reEvents);
        }, 1);
    }
    
    function timeMove(e) {
        let offsX = e.pageX - moveBar.getBoundingClientRect().x,
            preCrnt = audio.duration * (offsX / moveW),
            setHW = (100 * (offsX - 17)) / moveW;

        time.innerHTML = formatted(minMax(preCrnt, 0, audio.duration));
        time.style.left = minMax(setHW, 0, 87) + '%'
    }
    
    function setTime(e) {
        let offsX = e.pageX - moveBar.getBoundingClientRect().x;
        audio.currentTime = audio.duration * offsX / moveW;
    }
}





function move(e) {
    let offsX = e.pageX - moveBar.getBoundingClientRect().x,
        setW = minMax((100 * offsX) / moveW, 0, 100);
    
    progress.style.width = setW + '%';
}









function minMax(num, min, max) {
    if (num < min) {
        num = min;
    } else if (num > max) {
        num = max;
    }
    return num;
}