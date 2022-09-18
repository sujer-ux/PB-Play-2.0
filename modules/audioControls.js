let   img = document.querySelector('.image'),
      trackName = document.querySelector('.track'),
      bt = document.querySelector('.bt'),
      artName = document.querySelector('.art'),
      current = document.querySelector('.current'),
      duration = document.querySelector('.duration'),
      timeBar = document.querySelector('.timeProgress'),
      range = document.querySelector('.timeRange');


let SongID = 0;
let audio = new Audio(base.song[SongID]);

bt.addEventListener('click', function(e) {
    let btn = e.target;
      
    if (btn.classList.contains('play')) {
        if (audio.paused) {
            audio.play();
            btn.classList.add('played');
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
        loadMeta('play');
        
//        console.log(SongID);
    }
})

function loadMeta(toPlay) {
    audio.src = base.song[SongID];
    
    if (toPlay === 'play') {
        audio.play();
        bt.childNodes[5].classList.add('played');
    };
    
    let i = SongID;
    while (i < SongID + 3) {
        let image = new Image();
        image.src = base.image[i];
        i++
    }
    
    
    let image = new Image();
    image.src = base.image[SongID];
    image.style.opacity = '0';
    image.addEventListener('load', function() {
        image.style.opacity = '1';
        img.append(image);
    });
    if (toPlay === 'play') {
        img.childNodes[1].style.opacity = '0';
        setTimeout(() => {
            img.childNodes[1].remove()
        },200);
        console.log(img.childNodes);
    }
    
    

    trackName.innerHTML = base.trackItem[SongID];
    artName.innerHTML = base.trackArtst[SongID];
    textAnim();
}


window.onload = loadMeta;










