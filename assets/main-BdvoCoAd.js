(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))g(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&g(c)}).observe(document,{childList:!0,subtree:!0});function m(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function g(o){if(o.ep)return;o.ep=!0;const i=m(o);fetch(o.href,i)}})();function M(){const l=window.location.pathname,d=document.querySelectorAll("#header-links a"),m=document.querySelector(".menu-button"),g=document.querySelector(".responsive-overlay"),o=document.querySelector(".responsive-menu"),i=document.querySelector("body");m.addEventListener("click",()=>{o.classList.add("active-responsive-menu"),g.classList.add("active-overlay"),i.style.overflow="hidden"}),document.addEventListener("click",c=>{!o.contains(c.target)&&!m.contains(c.target)&&(o.classList.remove("active-responsive-menu"),g.classList.remove("active-overlay"),i.style.overflow="auto")}),window.addEventListener("resize",()=>{document.querySelector(".responsive-menu").classList.remove("active-responsive-menu"),g.classList.remove("active-overlay"),i.style.overflow="auto"}),d.forEach(c=>{new URL(c.getAttribute("href"),window.location.origin).pathname===l&&c.classList.add("active-link")})}function H(l){console.log(l)}function $(){const l=async g=>{for(const o of g)try{const c=await(await fetch(`https://api.themoviedb.org/3/movie/${o}?api_key=3e7bd78082a78694a13d5e52c5addee0&language=en-US`)).json();console.log(c)}catch(i){console.log(i)}};let d;function m(){localStorage.getItem("myLibrary")!==null?(d=JSON.parse(localStorage.getItem("myLibrary")),l(d)):console.log("Library does not exist"),localStorage.setItem("myLibrary",JSON.stringify(d))}m()}const O=[{name:"fullStar",svg:`<svg width="24" height="24" class="star-icon-full">
            <use class="full-star" href="svg/symbol-defs.svg#icon-star-outline"></use>
          </svg>`},{name:"halfStar",svg:`<svg width="24" height="24" class="star-icon-half">
            <use href="svg/symbol-defs.svg#icon-star-half"></use>
          </svg>`},{name:"emptyStar",svg:`<svg width="24" height="24" class="star-icon-empty">
            <use href="svg/symbol-defs.svg#icon-star-outline"></use>
          </svg>`}];function k(){const l="3e7bd78082a78694a13d5e52c5addee0",d=window.location.pathname,m=document.getElementById("movies-image-container"),g=document.getElementById("movies-description-container"),o=()=>{d==="/"||d==="/catalog.html"?(m.innerHTML='<img class="image" src="./img/stranger_things.jpeg"/>',g.innerHTML=`
        <h1 class="hero-movie-title">Let's Make Your Own Cinema</h1>
        <div class="desc-button-container">
          <p class="hero-movie-desc">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
          <div class="hero-movie-buttons">
            <button class="orange-button btn-hero trailer">Get Started</button>
          </div>
        </div>
      `):(m.innerHTML='<img class="image" src="./img/seats.png"/>',g.innerHTML=`
        <h1 class="hero-movie-title">Create Your Dream Cinema</h1>
        <div class="desc-button-container">
          <p class="hero-movie-desc"> Is a guide to designing a personalized movie theater experience with the right equipment, customized decor, and favorite films. This guide helps you bring the cinema experience into your own home with cozy seating, dim lighting, and movie theater snacks.</p>
        </div>
      `)},i=async()=>{try{const s=await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${l}&language=en-US`);if(!s.ok)throw o(),new Error("Failed to fetch trending movies");const h=(await s.json()).results.filter(L=>new Date(L.release_date).getFullYear()>=2024),u=h[Math.floor(Math.random()*h.length)];c(u)}catch(s){console.error("Error fetching trending movies:",s)}},c=async s=>{const r=(s.vote_average/2).toFixed(1),y=Math.floor(r),h=r%1!==0,u=5-y-(h?1:0);try{const S=await(await fetch(`https://api.themoviedb.org/3/movie/${s.id}/images?&api_key=${l}&language=en&language=null`)).json(),C=S.backdrops[Math.floor(Math.random()*S.backdrops.length)],b=s.overview.split(" ").slice(0,40).join(" ");m.innerHTML+=`<img class="image" src="https://image.tmdb.org/t/p/original${C.file_path}" />`,g.innerHTML+=`
        <h1 class="hero-movie-title">${s.title}</h1>
        <div class="stars-container" id="starsContainer"></div>
        <div class="desc-button-container">
          <p class="hero-movie-desc">${b}...</p>
          <div class="hero-movie-buttons">
            <button id="trailer" class="orange-button btn-hero trailer">Watch trailer</button>
            <button id="details" class="white-button btn-hero details">More details</button>
          </div>
        </div>
      `;const E=document.getElementById("trailer"),e=document.getElementById("details"),t=document.getElementById("starsContainer");if(s.vote_average===0){t.innerHTML+="<h1>NOT RELEASED YET</h1>";return}else O.forEach(n=>{n.name==="fullStar"&&(t.innerHTML+=n.svg.repeat(y)),n.name==="halfStar"&&(t.innerHTML+=n.svg.repeat(h)),n.name==="emptyStar"&&(t.innerHTML+=n.svg.repeat(u))});e.addEventListener("click",()=>{const n=s.id;H(n)}),E.addEventListener("click",async()=>{modal.innerHTML="";try{const a=(await(await fetch(`https://api.themoviedb.org/3/movie/${s.id}/videos?api_key=${l}&language=en-US`)).json()).results.find(v=>v.type==="Trailer"||v.type==="Teaser");a?modal.innerHTML+=`<iframe src="https://www.youtube.com/embed/${a.key}" allowfullscreen></iframe>`:modal.innerHTML+="<p>No trailer available</p>"}catch(n){console.error("Error fetching trailer:",n),modal.innerHTML+="<p>Error loading trailer</p>"}})}catch(L){console.error("Error displaying movie:",L),m.innerHTML="<p>Failed to load movie data</p>"}};i()}async function I(){const l="3e7bd78082a78694a13d5e52c5addee0",d="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key="+l,m="https://image.tmdb.org/t/p/w500",g=document.getElementById("catalog-movie-gallery"),o=document.getElementById("prevPageBtn"),i=document.getElementById("nextPageBtn"),c=document.querySelector(".page-numbers");let s=100,r=1,y={};async function h(){const e=`https://api.themoviedb.org/3/genre/movie/list?api_key=${l}&language=en-US`;try{y=(await(await fetch(e)).json()).genres.reduce((p,a)=>(p[a.id]=a.name,p),{})}catch(t){console.error("Error fetching genres:",t)}}async function u(e=1,t="",n=""){const p=Math.ceil(e*9/20);let a=`${d}&page=${p}`;t&&!n?a=`https://api.themoviedb.org/3/search/movie?query=${t}&api_key=${l}&page=${p}`:t&&n&&(a=`https://api.themoviedb.org/3/search/movie?api_key=${l}&query=${t}&primary_release_year=${n}&page=${p}`);try{const w=await(await fetch(a)).json(),_=(e-1)%2*9,f=w.results.slice(_,_+9);C(f),s=w.total_pages,b()}catch(v){console.error("Error fetching movies:",v)}}async function L(){await h(),await u()}L();function S(e){const n=Math.floor(e/2),p=e%2>=.5,a=5-n-(p?1:0),v=`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.852 16.8746C13.7336 16.875 13.6181 16.8381 13.5219 16.7691L9.00048 13.4911L4.47903 16.7691C4.38243 16.8392 4.26606 16.8767 4.14673 16.8762C4.0274 16.8758 3.91129 16.8374 3.81521 16.7667C3.71912 16.6959 3.64803 16.5964 3.61221 16.4826C3.57639 16.3688 3.5777 16.2465 3.61594 16.1335L5.37938 10.9103L0.809069 7.77612C0.710073 7.70831 0.635356 7.61062 0.595836 7.49732C0.556316 7.38402 0.554063 7.26105 0.589407 7.14638C0.624751 7.0317 0.695839 6.93134 0.792285 6.85995C0.888732 6.78856 1.00548 6.74988 1.12548 6.74956H6.76384L8.4654 1.51304C8.50205 1.39998 8.57358 1.30144 8.6697 1.23156C8.76583 1.16167 8.88163 1.12402 9.00048 1.12402C9.11932 1.12402 9.23512 1.16167 9.33125 1.23156C9.42738 1.30144 9.4989 1.39998 9.53555 1.51304L11.2371 6.75132H16.8755C16.9956 6.75126 17.1126 6.78967 17.2094 6.86093C17.3061 6.93218 17.3775 7.03254 17.413 7.1473C17.4486 7.26206 17.4465 7.38519 17.407 7.49866C17.3675 7.61213 17.2928 7.70998 17.1936 7.77788L12.6216 10.9103L14.384 16.1321C14.4125 16.2166 14.4205 16.3067 14.4074 16.395C14.3942 16.4832 14.3603 16.5671 14.3083 16.6396C14.2563 16.7122 14.1879 16.7713 14.1085 16.8122C14.0292 16.853 13.9413 16.8744 13.852 16.8746Z" fill="url(#paint0_linear_148_6989)"/>
    <defs>
    <linearGradient id="paint0_linear_148_6989" x1="2.62549" y1="2.24957" x2="13.8755" y2="17.2496" gradientUnits="userSpaceOnUse">
    <stop stop-color="#F84119"/>
    <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
    </linearGradient>
    </defs>
    </svg>`,w=`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6991)" stroke-linejoin="round"/>
    <path d="M9 1.6875V12.7969L4.14844 16.3125L6.04688 10.6875L1.125 7.3125H7.17188L9 1.6875Z" fill="url(#paint1_linear_148_6991)"/>
    <defs>
    <linearGradient id="paint0_linear_148_6991" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
    <stop stop-color="#ccc"/>
    <stop offset="1" stop-color="#ccc" stop-opacity="0.68"/>
    </linearGradient>
    <linearGradient id="paint1_linear_148_6991" x1="2.08688" y1="2.73251" x2="12.1506" y2="9.47748" gradientUnits="userSpaceOnUse">
    <stop stop-color="#F84119"/>
    <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
    </linearGradient>
    </defs>
    </svg>`,_=`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6994)" stroke-linejoin="round"/>
    <defs>
    <linearGradient id="paint0_linear_148_6994" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
    <stop stop-color="#ccc"/>
    <stop offset="1" stop-color="#ccc" stop-opacity="2"/>
    </linearGradient>
    </defs>
    </svg>`;let f=v.repeat(n);return p&&(f+=w),f+=_.repeat(a),f}function C(e){g.innerHTML="",e.forEach(t=>{const n=document.createElement("div");n.classList.add("catalog-movie-card");const p=document.createElement("img");p.src=m+t.poster_path,p.alt=t.title,p.classList.add("catalog-movie-poster");const a=document.createElement("div");a.classList.add("catalog-movie-info");const v=document.createElement("h2");v.textContent=t.title,v.classList.add("catalog-movie-title");const w=document.createElement("p"),_=t.genre_ids.map(T=>y[T]||"Unknown").filter(Boolean);w.textContent=`${_.join(", ")} | ${t.release_date.split("-")[0]}`,w.classList.add("catalog-movie-details");const f=document.createElement("p");f.innerHTML=S(t.vote_average),f.classList.add("catalog-movie-rating"),a.appendChild(v),a.appendChild(w),a.appendChild(f),n.appendChild(p),n.appendChild(a),g.appendChild(n)})}function b(){c.innerHTML="";const e=3,t=1;if(E(1),r>t+2){const a=document.createElement("span");a.textContent="...",c.appendChild(a)}const n=Math.max(2,r-Math.floor(e/2)),p=Math.min(s-1,r+Math.floor(e/2));for(let a=n;a<=p;a++)E(a);if(r<s-t-1){const a=document.createElement("span");a.textContent="...",c.appendChild(a)}s>1&&E(s),o.disabled=r===1,i.disabled=r===s}async function E(e){const t=document.createElement("button");t.textContent=e,t.classList.add("page-number"),e===r&&t.classList.add("active"),t.addEventListener("click",async()=>{r=e,await u(r),b()}),c.appendChild(t)}o.addEventListener("click",async()=>{r>1&&(r--,await u(r),b())}),i.addEventListener("click",async()=>{r<s&&(r++,await u(r),b())}),await u()}function P(){console.log("upcoming sayfasinin js i calisti");const d="https://api.themoviedb.org/3/movie/upcoming?api_key=3e7bd78082a78694a13d5e52c5addee0&language=en-US",m=document.getElementById("movie-poster"),g=document.getElementById("movie-title"),o=document.getElementById("release-date"),i=document.getElementById("vote-average"),c=document.getElementById("vote-count"),s=document.getElementById("popularity"),r=document.getElementById("genres"),y=document.getElementById("overview"),h=document.getElementById("add-btn"),u=document.getElementById("remove-btn");fetch(d).then(e=>e.json()).then(e=>{const t=e.results;if(t.length>0){const n=t[Math.floor(Math.random()*t.length)];L(n)}else document.querySelector(".upcoming__title").textContent="No upcoming movies this month"}).catch(e=>console.error("Error fetching data:",e));function L(e){m.src=`https://image.tmdb.org/t/p/original/${e.backdrop_path}`,m.alt=e.title,g.textContent=e.title,o.textContent=e.release_date,i.textContent=e.vote_average,c.textContent=e.vote_count,s.textContent=e.popularity,e.overview&&e.overview.trim()!==""?y.textContent=e.overview:y.textContent="No overview available for this movie.",r.textContent=e.genre_ids.join(", ");const t=S(e.id);C(t,e.id)}function S(e){return(JSON.parse(localStorage.getItem("myLibrary"))||[]).includes(e)}function C(e,t){e?(h.classList.add("hidden"),u.classList.remove("hidden")):(h.classList.remove("hidden"),u.classList.add("hidden")),h.addEventListener("click",()=>{b(t)}),u.addEventListener("click",()=>{E(t)})}function b(e){let t=JSON.parse(localStorage.getItem("myLibrary"))||[];t.includes(e)||(t.push(e),localStorage.setItem("myLibrary",JSON.stringify(t)),C(!0,e))}function E(e){let t=JSON.parse(localStorage.getItem("myLibrary"))||[];t=t.filter(n=>n!==e),localStorage.setItem("myLibrary",JSON.stringify(t)),C(!1,e)}}function x(){console.log("footer sayfasinin js i calisti")}function U(){console.log("searchbar sayfasinin js i calisti")}function B(){document.addEventListener("DOMContentLoaded",()=>{const l=document.getElementById("theme-toggle"),d=localStorage.getItem("theme")||"light-theme";document.body.classList.add(d),l.addEventListener("click",()=>{document.body.classList.toggle("light-theme"),document.body.classList.toggle("dark-theme");const m=document.body.classList.contains("dark-theme")?"dark-theme":"light-theme";localStorage.setItem("theme",m)}),console.log("theme js calıstı")})}window.location.pathname==="/catalog.html"&&(M(),k(),I(),x(),U(),B());window.location.pathname==="/mylibrary.html"&&(M(),k(),$(),x(),B());window.location.pathname==="/"&&(M(),k(),I(),P(),x(),B());
//# sourceMappingURL=main-BdvoCoAd.js.map
