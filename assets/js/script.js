"use strict";

/*==================================
  SAKURAVERSE
  FILE : script.js
  STATUS : IN PROGRESS
==================================*/

document.addEventListener("DOMContentLoaded", () => {

    initSmoothScroll();

    initActiveNav();

});


/*==================================
  SMOOTH SCROLL
==================================*/

function initSmoothScroll(){

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if(targetId === "#") return;

            const target = document.querySelector(targetId);

            if(!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        });

    });

}


/*==================================
  ACTIVE NAVIGATION
==================================*/

function initActiveNav(){

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(".nav-menu a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if(window.scrollY >= top &&
               window.scrollY < top + height){

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if(link.getAttribute("href") === `#${current}`){

                link.classList.add("active");

            }

        });

    });

}

/*==================================
  INITIALIZE
==================================*/

document.addEventListener("DOMContentLoaded", () => {

    initStickyHeader();

    initMobileMenu();

});


/*==================================
  STICKY HEADER
==================================*/

function initStickyHeader(){

    const header = document.querySelector(".header");

    if(!header) return;

    window.addEventListener("scroll", () => {

        if(window.scrollY > 60){

            header.classList.add("sticky");

        }else{

            header.classList.remove("sticky");

        }

    });

}


/*==================================
  MOBILE MENU
==================================*/

function initMobileMenu(){

    const toggle = document.querySelector(".menu-toggle");

    const nav = document.querySelector(".nav-menu");

    if(!toggle || !nav) return;

    toggle.addEventListener("click", () => {

        nav.classList.toggle("active");

        toggle.classList.toggle("active");

    });

    document.querySelectorAll(".nav-menu a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            toggle.classList.remove("active");

        });

    });

}

/*==================================
  INITIALIZE
==================================*/

document.addEventListener("DOMContentLoaded", () => {

    initScrollReveal();

});


/*==================================
  SCROLL REVEAL
==================================*/

function initScrollReveal(){

    const elements = document.querySelectorAll(

        ".feature-card, .path-card, .pricing-card, .testimonial-card, .achievement-card, .faq-item, .leaderboard-item, .dashboard-card, .quiz-card"

    );

    if(!elements.length) return;

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    },{

        threshold:0.15

    });

    elements.forEach((element,index)=>{

        element.classList.add("reveal");

        element.style.transitionDelay=`${index*0.08}s`;

        observer.observe(element);

    });

}

/*==================================
  INITIALIZE
==================================*/

document.addEventListener("DOMContentLoaded", () => {

    initCounters();

});


/*==================================
  ANIMATED COUNTERS
==================================*/

function initCounters(){

    const counters = document.querySelectorAll(".stat-card h2");

    if(!counters.length) return;

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            const counter = entry.target;

            const text = counter.textContent.trim();

            const number = parseInt(text.replace(/\D/g,""));

            if(isNaN(number)) return;

            let current = 0;

            const step = Math.max(1, Math.ceil(number / 80));

            const timer = setInterval(()=>{

                current += step;

                if(current >= number){

                    current = number;

                    clearInterval(timer);

                }

                if(text.includes("K+")){

                    counter.textContent = `${current}K+`;

                }else if(text.includes("★")){

                    counter.textContent = `${current}★`;

                }else if(text.includes("+")){

                    counter.textContent = `${current}+`;

                }else{

                    counter.textContent = current;

                }

            },20);

            observer.unobserve(counter);

        });

    },{

        threshold:0.5

    });

    counters.forEach(counter=>observer.observe(counter));

}

/*==================================
  INITIALIZE
==================================*/

document.addEventListener("DOMContentLoaded", () => {

    initFAQ();

    initQuiz();

});


/*==================================
  FAQ ACCORDION
==================================*/

function initFAQ(){

    const items = document.querySelectorAll(".faq-item");

    if(!items.length) return;

    items.forEach(item=>{

        const question = item.querySelector("h3");

        const answer = item.querySelector("p");

        if(!question || !answer) return;

        answer.style.display="none";

        question.addEventListener("click",()=>{

            const opened = item.classList.contains("active");

            items.forEach(faq=>{

                faq.classList.remove("active");

                const text = faq.querySelector("p");

                if(text) text.style.display="none";

            });

            if(!opened){

                item.classList.add("active");

                answer.style.display="block";

            }

        });

    });

}


/*==================================
  QUIZ INTERACTION
==================================*/

function initQuiz(){

    const options = document.querySelectorAll(".quiz-option");

    if(!options.length) return;

    options.forEach(option=>{

        option.addEventListener("click",()=>{

            options.forEach(btn=>{

                btn.classList.remove("correct","wrong");

                btn.disabled=true;

            });

            if(option.textContent.trim()==="Arigatou"){

                option.classList.add("correct");

            }else{

                option.classList.add("wrong");

                options.forEach(btn=>{

                    if(btn.textContent.trim()==="Arigatou"){

                        btn.classList.add("correct");

                    }

                });

            }

        });

    });

}

/*==================================
  INITIALIZE
==================================*/

document.addEventListener("DOMContentLoaded", () => {

    initProgressBars();

    initBackToTop();

});


/*==================================
  PROGRESS BAR ANIMATION
==================================*/

function initProgressBars(){

    const bars = document.querySelectorAll(".progress-fill");

    if(!bars.length) return;

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            const bar = entry.target;

            const width = bar.style.width;

            bar.style.width = "0%";

            setTimeout(()=>{

                bar.style.transition = "width 1.5s ease";

                bar.style.width = width;

            },100);

            observer.unobserve(bar);

        });

    },{

        threshold:0.4

    });

    bars.forEach(bar=>observer.observe(bar));

}


/*==================================
  BACK TO TOP
==================================*/

function initBackToTop(){

    const button = document.createElement("button");

    button.className = "back-to-top";

    button.innerHTML = "↑";

    document.body.appendChild(button);

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 400){

            button.classList.add("show");

        }else{

            button.classList.remove("show");

        }

    });

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*==================================
  WINDOW EVENTS
==================================*/

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});


window.addEventListener("resize",()=>{

    const nav = document.querySelector(".nav-menu");

    if(window.innerWidth > 992 && nav){

        nav.classList.remove("active");

    }

});


/*==================================
  GLOBAL ERROR HANDLER
==================================*/

window.addEventListener("error",(event)=>{

    console.warn("SakuraVerse:",event.message);

});


/*==================================
  END OF FILE
==================================*/

/*

Project : SakuraVerse

File : script.js

Version : 1.0.0

Status : LOCKED

Developer : Leo

*/
