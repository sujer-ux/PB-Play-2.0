let playListMain = document.querySelector('.playList');
let sections = {};

function loadList(elem) {
    let i = 0;
    while (i < base.song.length) {
        elem.insertAdjacentHTML('beforeend', `
            <div class="section" data-id="${i}">
                <div class="cover">
                    <div class="play-ico"></div>
                    <img src="${base.image60[i]}" alt="">
                </div>
                <div class="textBlock">
                    <div class="track-name">${base.trackItem[i]}</div>
                    <div class="art-name">${base.trackArtst[i]}</div>
                </div>
                <div class="btnMore">${formatted(base.duration[i])}</div>
            </div>
        `);
        i++
    }
    sections = elem.getElementsByClassName('section');
}


function addE(elem) {
    let i = 0;
    while (i < sections.length) {
        sections[i].addEventListener('click', function() {
            if (!this.classList.contains('ugu')) {
                switcher(Number(this.getAttribute('data-id')));
                this.classList.remove('over');
                this.classList.add('ugu-played');
                sections[preID.at(-2)].classList.remove('ugu-played');
            } else {
                if (audio.paused) {
                    play(audio);
                    this.classList.add('ugu-played');
                } else {
                    audio.pause();
                    bt.childNodes[5].classList.remove('played');
                    this.classList.remove('ugu-played');
                }
            }
        });
        sections[i].addEventListener('mouseover', function() {
            if (!this.classList.contains('ugu')) {
                this.classList.add('over');
            } else {
                this.classList.add('over-played');
            }
        });
        sections[i].addEventListener('mouseout', function() {
            if (!this.classList.contains('ugu')) {
                this.classList.remove('over');
            } else {
                this.classList.remove('over-played');
            }
        });
        i++
    }
}


function switchSection(elem, id) {
    let i = 0;
    while (i < sections.length) {
        if (Number(sections[i].getAttribute('data-id')) == id) {
            sections[i].classList.add('ugu');
        } else {
            sections[i].classList.remove('ugu');
        }
        i++
    }
}







