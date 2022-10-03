let playListMain = document.querySelector('.playList');


function loadList(elem) {
    let i = 0;
    while (i < base.song.length) {
        elem.insertAdjacentHTML('beforeend',
            '<div class="section" data-id="'+i+'">'
                +'<div class="cover">'
                    +'<img src="'+base.image60[i]+'" alt="">'
                +'</div>'
                +'<div class="textBlock">'
                    +'<div class="track-name">'+base.trackItem[i]+'</div>'
                    +'<div class="art-name">'+base.trackArtst[i]+'</div>'
                +'</div>'
                +'<div class="btnMore">...</div>'
            +'</div>'
        );
        i++
    }
}

function addE(elem) {
    let sections = elem.getElementsByClassName('section');
    let i = 0;
    while (i < sections.length) {
        sections[i].addEventListener('click', function() {
            if (!this.classList.contains('ugu')) {
                console.log(Number(this.getAttribute('data-id')));
                switcher(Number(this.getAttribute('data-id')));
            } else {
                
            }
        });
        i++
    }
}

function switchSection(elem, id) {
    let sections = elem.getElementsByClassName('section');
    let i = 0;
    while (i < sections.length) {
        if (Number(sections[i].getAttribute('data-id')) == id) {
            sections[i].classList.add('ugu');
//            console.log(sections[i]);
        } else {
            sections[i].classList.remove('ugu');
        }
        i++
    }
//    console.log(sections);
}







