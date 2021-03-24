// import { info } from "node-sass";
import style from "./css/index.scss"
import anime from 'animejs/lib/anime.es.js';

// Validation form 

const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const submit = document.getElementById('submit');
const infoMessage = document.getElementById('info');
const form = document.querySelector('form');
const burger = document.querySelector('.fas.fa-bars');
const close = document.querySelector('.far.fa-window-close');
const nav = document.querySelector('.nav');
const navLink = document.querySelectorAll('.nav a');

function openNav() {
    nav.style.display = 'block';
    burger.style.visibility = 'hidden';
    close.style.display = 'block';
}

function closeNav() {
    nav.style.display = 'none';
    burger.style.visibility = 'visible';
    close.style.display = 'none';

}

navLink.forEach((link) => {
    link.addEventListener('click', () => {
    closeNav();
    })
})

burger.addEventListener('click', () => {
    openNav();
})

close.addEventListener('click', () => {
    closeNav();
})


const showError = (input, msg) => {
    const info = input.parentElement.querySelector('.error-text');
    input.classList.add('error');
    info.textContent = msg;
}

const clearError = input => {
    const info = input.parentElement.querySelector('.error-text');
    input.classList.remove('error');
    info.textContent = '';
}

const checkForm = input => {
    input.forEach(el => {
        if (el.value === '') {
            showError(el, `Please, state Your${el.placeholder}`);
            clearInputs(el);
        } else {
            clearError(el);
        }
    })
}

const checkLength = (input, min) => {
    if (input.value.length < min) {
        showError(input, `${input.placeholder} should have min. ${min} signs.`);
        clearInputs(input);
    } else {
        clearError(input);
    }
}

const checkEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email.value)) {
        clearError(email)
    } else {
        showError(email, 'E-mail is incorrect');
        clearInputs(email);
    }
}


const clearInputs = (input) => {

    input.addEventListener('input', () => {
        clearError(input)
    })
}

const checkErrors = () => {
    const allInputs = Array.from([name, email, message]);
    console.log(allInputs)
    let errorCount = 0;

    allInputs.forEach(el => {
        if (el.classList.contains('error')) {
            errorCount++
            console.log(errorCount)
        }
    })

    if (errorCount === 0) {
        infoMessage.style.visibility = 'visible';
    }
}

submit.addEventListener('click', e => {
    e.preventDefault();
    checkForm([name, email, message]);
    checkLength(name, 3);
    checkEmail(email);
    checkErrors();
})


// animatons

let spans = document.querySelectorAll('.hero span p');

anime({
    targets: spans,
    width: {
        value: [0, '100%'],
        duration: 1800,
        delay: anime.stagger(500),
    },
    opacity: {
        value: [0, 1],
        duration: 500,
    },
    easing: 'linear',
})

let navItem = document.querySelectorAll('.nav__item:not(:last-child)');

anime({
    targets: navItem,
    translateX: [-500, 0],
    duration: 1000,
    delay: anime.stagger(500),
    easing: 'easeInOutExpo'
})

const logo = document.querySelector('.logo');

anime({
    targets: logo,
    scale: [2, 1],
    duration: 1000,
    easing: 'easeInQuad',
    delay: 500,
})


const sections = document.querySelectorAll('section p');

const options = {
    root: null, //it is the viewport
    threshold: 0,
    rootMargin: "-150px"
};

const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return
        }

        let aboutText = {
            targets: entry.target,
            opacity: 1,
            duration: 1500,
            easing: 'easeInOutSine',
        }

        anime(aboutText);
        observer.unobserve(entry.target);
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
})



const sectionOne = document.getElementById('about');

const sectionOneOptions = {
    rootMargin: "-200px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function (entries, sectionOneObserver) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            nav.classList.remove('nav_scrolled');
        } else {
            nav.classList.add('nav_scrolled');
        }
    })
}, sectionOneOptions);

sectionOneObserver.observe(sectionOne);


const images = document.querySelectorAll('.image');

const imageOptions = {
    root: null, //it is the viewport
    threshold: 0,
    rootMargin: "-150px"
}

const imageObserver = new IntersectionObserver(function (entries, imageObserver) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return
        } else {
            let imagesAnime = {
                targets: entry.target,
                rotate: [0, 3, -3, 0],
                duration: 1000,
                delay: anime.stagger(500),
                easing: 'easeInSine',
            }
            anime(imagesAnime);
            observer.unobserve(entry.target);
        }
    })
}, imageOptions);

images.forEach(img => {
    imageObserver.observe(img)
});