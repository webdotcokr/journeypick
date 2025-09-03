var todayBtn = document.querySelector('.jsTodayBtn');

function loadTodayView() {
    var wrap = document.querySelector('#wrap');
    var TVCont = document.createElement("iframe");
        TVCont.setAttribute("id", "today-view");
        TVCont.setAttribute("frameborder", "0");
        TVCont.setAttribute("height", "409px");
        TVCont.style.width = "450px";
        TVCont.src = "/moa/import/popup/today_view.html";
        wrap.prepend(TVCont);
    
        TVCont.onload = function() {
            TVCont.classList.add('on');
        }
}

todayBtn.addEventListener('click', loadTodayView);

