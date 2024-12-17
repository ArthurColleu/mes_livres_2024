(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const d=(o,r,t,n)=>{const e={titre:o,auteur:r,resume:t,estLu:n,id:crypto.randomUUID(),createdAt:new Date().toDateString()};JSON.stringify(e);const s=localStorage.getItem("livres"),i=s?JSON.parse(s):[];i.push(e),localStorage.setItem("livres",JSON.stringify(i))},u=()=>{const o=localStorage.getItem("livres");return o?JSON.parse(o):[]},m=o=>{const r=localStorage.getItem("livres"),n=(r?JSON.parse(r):[]).filter(e=>e.id!==o);localStorage.setItem("livres",JSON.stringify(n))},c=()=>{const o=document.querySelector("#booksList"),r=u();o.innerHTML=r.map(t=>{const n=new Date(t.createdAt).toLocaleDateString("fr-FR");return`
            <div class="col-md-6 col-lg-4" id="book-${t.id}">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title mb-0">${t.titre}</h5>
                            <span class="badge ${t.estLu?"bg-success":"bg-secondary"} toggle-read-btn" 
                                    style="cursor: pointer;" data-id="${t.id}">
                                ${t.estLu?'<i class="bi bi-check-circle me-1"></i>Lu':'<i class="bi bi-circle me-1"></i>Non lu'}
                            </span>
                            </div>
                            <h6 class="card-subtitle mb-2">
                            <i class="bi bi-person me-1"></i>${t.auteur}
                            </h6>
                            <p class="card-text small">${t.resume}</p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                            <small class="text-muted">
                                <i class="bi bi-calendar3 me-1"></i>${n}
                            </small>
                            <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${t.id}" >
                                <i class="bi bi-trash me-1"></i>Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
`}).join("")},f=()=>{const o=document.querySelector("#toggleFormBtn");document.querySelector("#formSection");const r=new bootstrap.Collapse(formSection,{toggle:!1}),t=document.querySelector("#bookForm");o.addEventListener("click",()=>{console.log("click !"),r.toggle()}),formSection.addEventListener("hidden.bs.collapse",()=>{t.reset()}),t.addEventListener("submit",e=>{e.preventDefault();const s=t.title.value,i=t.author.value,l=t.summary.value,a=t.isRead.checked;d(s,i,l,a),r.hide(),c()}),document.querySelector("#booksList").addEventListener("click",e=>{const s=e.target.closest(".delete-btn , .toggle-read-btn");if(s===null)return;const i=s.dataset.id;s.classList.contains("delete-btn")?(m(i),c()):s.classList.contains("toggle-read-btn")&&c()})};f();c();
