(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const m of e)if(m.type==="childList")for(const c of m.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const m={};return e.integrity&&(m.integrity=e.integrity),e.referrerPolicy&&(m.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?m.credentials="include":e.crossOrigin==="anonymous"?m.credentials="omit":m.credentials="same-origin",m}function r(e){if(e.ep)return;e.ep=!0;const m=s(e);fetch(e.href,m)}})();function U(){const t=window.location.pathname,o=document.querySelectorAll("#header-links a"),s=document.querySelector(".menu-button"),r=document.querySelector(".responsive-overlay"),e=document.querySelector(".responsive-menu"),m=document.querySelector("body");let c=!1;s.addEventListener("click",()=>{e.classList.add("active-responsive-menu"),r.classList.add("active-overlay"),m.style.overflow="hidden",c=!0}),document.addEventListener("click",h=>{c&&!e.contains(h.target)&&!s.contains(h.target)&&(e.classList.remove("active-responsive-menu"),r.classList.remove("active-overlay"),m.style.overflow="auto",c=!1)}),window.addEventListener("resize",()=>{c&&(e.classList.remove("active-responsive-menu"),r.classList.remove("active-overlay"),m.style.overflow="auto",c=!1)}),o.forEach(h=>{"/cinemania"+new URL(h.getAttribute("href"),window.location.origin).pathname===t&&h.classList.add("active-link")})}function N(t){const o="3e7bd78082a78694a13d5e52c5addee0",s=document.querySelector(".popup-section-container"),r=document.querySelector(".popup-section"),e=document.querySelector(".close-btn"),m=document.querySelector("body"),c=document.querySelector(".afis-img"),h=document.querySelector(".film-title"),S=document.querySelector(".average-rating"),u=document.querySelector(".vote-count"),v=document.querySelector(".genre"),w=document.querySelector(".popularity"),l=document.querySelector(".film-about-desc");(async()=>{g();try{const L=await(await fetch(`https://api.themoviedb.org/3/movie/${t}?api_key=${o}&language=en-US`)).json();n(L)}catch(i){console.error("Error fetching details:",i)}})();function n(i){c.src=`https://image.tmdb.org/t/p/original/${i.poster_path}`,h.textContent=i.title,S.textContent=i.vote_average,u.textContent=i.vote_count,w.textContent=i.popularity.toFixed(1),v.textContent=i.genres.map(_=>_.name).join(", "),l.textContent=i.overview;let L=!1;function E(){s.classList.add("hidden"),m.style.overflow="auto",L=!1,document.removeEventListener("click",I),document.removeEventListener("keydown",x),e.removeEventListener("click",k)}function I(_){L&&!r.contains(_.target)&&E()}function k(_){L&&E()}function x(_){L&&_.key==="Escape"&&E()}s.classList.contains("hidden")||(L=!0,document.addEventListener("click",I),document.addEventListener("keydown",x),e.addEventListener("click",k))}function g(){c.src="loading-placeholder.png",h.textContent="Loading...",S.textContent="",u.textContent="",w.textContent="",v.textContent="",l.textContent="Fetching details, please wait..."}}function P(t){const o=[{name:"fullStar",svg:`<svg width="24" height="24" class="star-icon-full">
                  <use class="full-star" href="svg/symbol-defs.svg#icon-star-outline"></use>
                </svg>`},{name:"halfStar",svg:`<svg width="24" height="24" class="star-icon-half">
                  <use href="svg/symbol-defs.svg#icon-star-half"></use>
                </svg>`},{name:"emptyStar",svg:`<svg width="24" height="24" class="star-icon-empty">
                  <use href="svg/symbol-defs.svg#icon-star-outline"></use>
                </svg>`}],s=5,r=Math.floor(t/2),e=t%2>=.5,m=s-r-(e?1:0);if(t===0)return"NOT RELEASED YET";const c=o.find(v=>v.name==="fullStar").svg,h=o.find(v=>v.name==="halfStar").svg,S=o.find(v=>v.name==="emptyStar").svg;let u=c.repeat(r);return e&&(u+=h),u+=S.repeat(m),u}function A(t){let o=JSON.parse(localStorage.getItem("myLibrary"))||[];o.includes(t)||(o.push(t),localStorage.setItem("myLibrary",JSON.stringify(o)),T(!0,t))}function G(t){const o=window.location.pathname;let s=JSON.parse(localStorage.getItem("myLibrary"))||[];s=s.filter(r=>r!==t),localStorage.setItem("myLibrary",JSON.stringify(s)),T(!1,t),o.includes("mylibrary.html")&&(K(t),V())}function K(t){const o=document.querySelector(`[data-movie-id="${t}"]`);o&&o.remove();const s=JSON.parse(localStorage.getItem("myLibrary"))||[],r=document.querySelector("#catalog-movie-gallery");s.length===0&&(r.innerHTML="<p>Your library is empty.</p>")}function V(){const t=document.querySelector(".popup-section-container");t&&(t.classList.add("hidden"),document.body.style.overflow="auto")}function H(t){return(JSON.parse(localStorage.getItem("myLibrary"))||[]).includes(t)}function T(t,o){const s=document.querySelectorAll(".add-btn"),r=document.querySelectorAll(".remove-btn");t?(s.forEach(e=>e.classList.add("hidden")),r.forEach(e=>e.classList.remove("hidden"))):(s.forEach(e=>e.classList.remove("hidden")),r.forEach(e=>e.classList.add("hidden"))),s.forEach(e=>e.onclick=()=>A(o)),r.forEach(e=>e.onclick=()=>G(o))}function W(t){const o=document.getElementById("upcoming-add-btn"),s=document.getElementById("upcoming-remove-btn");function r(){H(t)?(o.classList.add("hidden"),s.classList.remove("hidden")):(o.classList.remove("hidden"),s.classList.add("hidden"))}o.onclick=()=>{A(t),r()},s.onclick=()=>{G(t),r()},r()}function j(){const t="3e7bd78082a78694a13d5e52c5addee0",o=window.location.pathname,s=document.getElementById("movies-image-container"),r=document.getElementById("movies-description-container"),e=document.querySelector(".popup-section-container"),m=document.querySelector("body"),c=()=>{o.includes("/")||o.includes("catalog.html")?(s.innerHTML='<img class="image" src="./img/stranger_things.jpeg"/>',r.innerHTML=`
        <h1 class="hero-movie-title">Let's Make Your Own Cinema</h1>
        <div class="desc-button-container">
          <p class="hero-movie-desc">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
          <div class="hero-movie-buttons">
            <button class="orange-button btn-hero trailer">Get Started</button>
          </div>
        </div>
      `):(s.innerHTML='<img class="image" src="./img/seats.png"/>',r.innerHTML=`
        <h1 class="hero-movie-title">Create Your Dream Cinema</h1>
        <div class="desc-button-container">
          <p class="hero-movie-desc"> Is a guide to designing a personalized movie theater experience with the right equipment, customized decor, and favorite films. This guide helps you bring the cinema experience into your own home with cozy seating, dim lighting, and movie theater snacks.</p>
        </div>
      `)},h=async()=>{try{const u=await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${t}&language=en-US`);if(!u.ok)throw c(),new Error("Failed to fetch trending movies");const l=(await u.json()).results.filter(n=>new Date(n.release_date).getFullYear()>=2024),a=l[Math.floor(Math.random()*l.length)];S(a)}catch(u){console.error("Error fetching trending movies:",u)}},S=async u=>{try{const w=await(await fetch(`https://api.themoviedb.org/3/movie/${u.id}/images?&api_key=${t}&language=en&language=null`)).json(),l=w.backdrops[Math.floor(Math.random()*w.backdrops.length)],a=u.overview.split(" ").slice(0,40).join(" ");s.innerHTML=`<img class="image" src="https://image.tmdb.org/t/p/original${l.file_path}" /> <div class="gradient"></div>`,r.innerHTML=`
        <h1 class="hero-movie-title">${u.title}</h1>
        <div class="stars-container" id="starsContainer"></div>
        <div class="desc-button-container">
          <p class="hero-movie-desc">${a}...</p>
          <div class="hero-movie-buttons">
            <button id="trailer" class="orange-button btn-hero trailer">Watch trailer</button>
            <button id="details" class="white-button btn-hero details">More details</button>
          </div>
        </div>
      `,starsContainer.innerHTML=P(u.vote_average);const n=document.getElementById("trailer"),g=document.getElementById("details");P(u.vote_average),g.addEventListener("click",()=>{e.classList.remove("hidden"),m.style.overflow="hidden";const i=u.id;N(i);const L=H(i);T(L,i)}),n.addEventListener("click",async()=>{modal.innerHTML="";try{const E=(await(await fetch(`https://api.themoviedb.org/3/movie/${u.id}/videos?api_key=${t}&language=en-US`)).json()).results.find(I=>I.type==="Trailer"||I.type==="Teaser");E?modal.innerHTML+=`<iframe src="https://www.youtube.com/embed/${E.key}" allowfullscreen></iframe>`:modal.innerHTML+="<p>No trailer available</p>"}catch(i){console.error("Error fetching trailer:",i),modal.innerHTML+="<p>Error loading trailer</p>"}})}catch(v){console.error("Error displaying movie:",v)}};h()}async function J(){const t="3e7bd78082a78694a13d5e52c5addee0",o="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key="+t,s="https://image.tmdb.org/t/p/w500";let r="",e="";const m=window.location.pathname,c=m.includes("catalog"),h=document.getElementById("catalog-movie-gallery"),S=document.querySelector(".catalog-desc-container"),u=c?document.getElementById("prevPageBtn"):null,v=c?document.getElementById("nextPageBtn"):null,w=c?document.querySelector(".page-numbers"):null,l=c?document.getElementById("searchButton"):null,a=c?document.getElementById("movieYear"):null;let n=1,g={},i=100;c?S.style.display="none":S.style.display="flex";async function L(){const y=`https://api.themoviedb.org/3/genre/movie/list?api_key=${t}&language=en-US`;try{g=(await(await fetch(y)).json()).genres.reduce((C,d)=>(C[d.id]=d.name,C),{})}catch(p){console.error("Error fetching genres:",p)}}async function E(y=1,p="",M=""){const C=Math.ceil(y*9/20);let d=`${o}&page=${C}`;p&&!M?d=`https://api.themoviedb.org/3/search/movie?query=${p}&api_key=${t}&page=${C}`:p&&M&&(d=`https://api.themoviedb.org/3/search/movie?api_key=${t}&query=${p}&primary_release_year=${M}&page=${C}`);try{const b=await(await fetch(d)).json();if(m.includes("catalog")){const B=(y-1)%2*9,q=b.results.slice(B,B+9);I(q)}else{const B=(y-1)%2*3,q=b.results.slice(B,B+3);I(q)}return c&&(i=Math.min(b.total_pages,1e3),k()),b}catch(f){console.error("Error fetching movies:",f)}}function I(y){h.innerHTML="",y.forEach(d=>{const f=document.createElement("div");f.classList.add("catalog-movie-card"),f.dataset.movieId=d.id;const b=document.createElement("img");b.src=s+d.poster_path,b.alt=d.title,b.classList.add("catalog-movie-poster");const B=document.createElement("div");B.classList.add("catalog-movie-info");const q=document.createElement("h2");q.textContent=d.title,q.classList.add("catalog-movie-title");const $=document.createElement("div");$.classList.add("catalog-movie-details-rating");const D=document.createElement("p"),R=d.genre_ids.map(z=>g[z]||"Unknown").filter(Boolean);D.textContent=`${R[0]}, ${R[1]} | ${d.release_date.split("-")[0]}`,D.classList.add("catalog-movie-details");const O=document.createElement("p");O.innerHTML=P(d.vote_average),O.classList.add("catalog-movie-rating"),B.appendChild(q),$.appendChild(D),$.appendChild(O),B.appendChild($),f.appendChild(b),f.appendChild(B),h.appendChild(f)});const p=document.querySelectorAll(".catalog-movie-card"),M=document.querySelector(".popup-section-container"),C=document.querySelector("body");p.forEach(d=>{d.addEventListener("click",f=>{const b=Number(f.currentTarget.dataset.movieId);N(b),M.classList.remove("hidden"),C.style.overflow="hidden";const B=H(b);T(B,b)})})}function k(){if(!c)return;w.innerHTML="";const y=3,p=1;if(x(1),n>p+2){const d=document.createElement("span");d.textContent="...",w.appendChild(d)}const M=Math.max(2,n-Math.floor(y/2)),C=Math.min(i-1,n+Math.floor(y/2));for(let d=M;d<=C;d++)x(d);if(n<i-p-1){const d=document.createElement("span");d.textContent="...",w.appendChild(d)}i>1&&x(i),u.disabled=n===1,v.disabled=n===i}async function x(y){const p=document.createElement("button");p.textContent=y,p.classList.add("page-number"),y===n&&p.classList.add("active"),p.addEventListener("click",async()=>{n=y,await E(n,r,e),k()}),w.appendChild(p)}c&&(u.addEventListener("click",async()=>{n>1&&(n--,await E(n),k())}),v.addEventListener("click",async()=>{n<i&&(n++,await E(n),k())}),document.getElementById("movieName").addEventListener("input",()=>{const y=document.getElementById("movieYear");y.innerHTML="",a.style.display="none",e=""}),l.addEventListener("click",async()=>{try{r=document.getElementById("movieName").value,e=document.getElementById("movieYear").value||"";const y=async(M,C="")=>await E(1,M,C);c&&k();const p=await y(r,e);if(p.results.length===0?a.style.display="none":a.style.display="block",Array.isArray(p.results)){if(!e){const M=p.results.map(f=>f.release_date?new Date(f.release_date).getFullYear():null).filter(f=>f!==null),C=[...new Set(M)].sort((f,b)=>f-b),d=document.getElementById("movieYear");d.innerHTML===""&&C.forEach(f=>{const b=document.createElement("option");b.value=f,b.text=f,d.appendChild(b)})}}else console.error("Beklenmeyen sonuç: movies bir dizi değil")}catch(y){console.error("Film verilerini işlerken hata:",y)}}));async function _(){await L(),await E()}_()}function Q(){console.log("upcoming sayfasinin js i calisti");const t="3e7bd78082a78694a13d5e52c5addee0",o=`https://api.themoviedb.org/3/movie/upcoming?api_key=${t}&language=en-US`,s=`https://api.themoviedb.org/3/genre/movie/list?api_key=${t}&language=en-US`,r=document.getElementById("movie-poster"),e=document.getElementById("movie-title"),m=document.getElementById("release-date"),c=document.getElementById("vote-average"),h=document.getElementById("vote-count"),S=document.getElementById("popularity"),u=document.getElementById("genres"),v=document.getElementById("overview");let w={};fetch(s).then(a=>a.json()).then(a=>{a.genres.forEach(n=>{w[n.id]=n.name}),fetch(o).then(n=>n.json()).then(n=>{const g=n.results;if(g.length>0){const i=g[Math.floor(Math.random()*g.length)];l(i)}else document.querySelector(".upcoming__title").textContent="No upcoming movies this month"}).catch(n=>console.error("Error fetching movies:",n))}).catch(a=>console.error("Error fetching genres:",a));function l(a){r.src=`https://image.tmdb.org/t/p/original/${a.backdrop_path}`,r.alt=a.title,e.textContent=a.title,m.textContent=a.release_date,c.textContent=a.vote_average,h.textContent=a.vote_count,S.textContent=a.popularity,u.textContent=a.genre_ids.map(n=>w[n]).join(", "),a.overview&&a.overview.trim()!==""?v.textContent=a.overview:v.textContent="No overview available for this movie.",W(a.id)}}function Y(){console.log("footer sayfasinin js i calisti")}function F(){document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("theme-toggle"),o=localStorage.getItem("theme")||"light-theme";document.body.classList.add(o),t.addEventListener("click",()=>{document.body.classList.toggle("light-theme"),document.body.classList.toggle("dark-theme");const s=document.body.classList.contains("dark-theme")?"dark-theme":"light-theme";localStorage.setItem("theme",s)})})}function X(){const t=JSON.parse(localStorage.getItem("myLibrary"))||[];let o=[],s=[];const r=document.querySelector("#catalog-movie-gallery"),e=document.querySelector(".load-more-button"),m="https://image.tmdb.org/t/p/w500";let c=0;const h=9,S=async()=>{try{const l=t.map(async a=>{const n=await fetch(`https://api.themoviedb.org/3/movie/${a}?api_key=3e7bd78082a78694a13d5e52c5addee0&language=en-US`);if(!n.ok)throw new Error("API request failed");return n.json()});o=await Promise.all(l),s=o,u(),w(o)}catch(l){console.error("Error fetching films:",l)}};function u(){s.slice(c,c+h).forEach(a=>{const n=v(a);r.appendChild(n)}),c+=h,c>=s.length?e.classList.add("hidden"):e.classList.remove("hidden")}function v(l){const a=document.createElement("div");a.classList.add("catalog-movie-card"),a.dataset.movieId=l.id;const n=document.createElement("img");n.src=m+l.poster_path,n.alt=l.title,n.classList.add("catalog-movie-poster");const g=document.createElement("div");g.classList.add("catalog-movie-info");const i=document.createElement("h2");i.textContent=l.title,i.classList.add("catalog-movie-title");const L=document.createElement("div");L.classList.add("catalog-movie-details-rating");const E=document.createElement("p"),I=l.genres.map(x=>x.name);E.textContent=`${I[0]}, ${I[1]} | ${l.release_date.split("-")[0]}`,E.classList.add("catalog-movie-details");const k=document.createElement("p");return k.innerHTML=P(l.vote_average),k.classList.add("catalog-movie-rating"),g.appendChild(i),L.appendChild(E),L.appendChild(k),g.appendChild(L),a.appendChild(n),a.appendChild(g),a.addEventListener("click",()=>{N(l.id),document.querySelector(".popup-section-container").classList.remove("hidden"),document.body.style.overflow="hidden";const x=H(l.id);T(x,l.id)}),a}function w(l){const a=document.getElementById("film-category"),n=new Set;l.forEach(g=>{g.genres.forEach(i=>{n.add(i.name)})}),n.forEach(g=>{const i=document.createElement("option");i.value=g,i.innerText=g,a.appendChild(i)}),a.addEventListener("change",g=>{const i=g.target.value;r.innerHTML="",c=0,i===""?s=o:s=o.filter(L=>L.genres.some(E=>E.name===i)),u()})}e.addEventListener("click",u),t.length>0?S():console.log("Library is empty")}window.location.pathname.includes("catalog.html")&&(U(),j(),J(),Y(),F());window.location.pathname.includes("mylibrary.html")&&(U(),j(),Y(),F(),X());!window.location.pathname.includes("mylibrary.html")&&!window.location.pathname.includes("catalog.html")&&(U(),j(),Q(),J(),Y(),F());
//# sourceMappingURL=main-BXrlwFW2.js.map
