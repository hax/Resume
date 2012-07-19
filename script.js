var Resume = function(window, document) {

    var start = NaN;
    var dest = NaN;
    var hash;
    var step;

    var scroll = function() {
        var temp;
        if(window.innerWidth < 650 || start == document.documentElement.scrollTop + document.body.scrollTop) {
            window.location.hash = hash;
            start = dest = NaN;
            return;
        }
        start = document.documentElement.scrollTop + document.body.scrollTop;
        temp = start > dest ? start + Math.floor((dest - start)/10) : start + Math.ceil((dest - start)/10);
        if(Math.abs(dest - temp) > 1) {
            window.scrollTo(0, temp);
            step = window.setTimeout(scroll, 16);
        } else {
            window.scrollTo(0, dest);
            window.location.hash = hash;
            start = dest = NaN;
        }
    };

    var init = function() {
        var sect = document.getElementsByTagName('section');
        var nav = document.createElement('nav');
        var ul = document.createElement('ul');
        Array.prototype.forEach.call(sect, function(s, i) {
            ul.innerHTML += '<li><a href="#' + s.id + '">' + s.querySelector('h2').innerHTML + '</a></li>';
            s.addEventListener('click', function(e) {
                setTimeout(function() {
                    window.location.hash = '#' + s.id;
                }, 10);
            }, false);
        });
        nav.appendChild(ul);
        nav.addEventListener('click', function(e) {
            e.preventDefault();
            if(e.target.tagName.toLowerCase() == 'a') {
                dest = document.getElementById(e.target.getAttribute('href').substr(1)).offsetTop;
                hash = e.target.getAttribute('href');
                clearTimeout(step);
                scroll();
            }
        }, false);
        document.body.insertBefore(nav, document.querySelector('div'));
        window.addEventListener('resize', function() {
            document.body.className = window.innerWidth < 650 ? 'mobile' : 'desktop';
        }, false);
        window.addEventListener('load', function() {
            if(window.location.hash == '') {
                window.location.hash = '#' + sect[0].id;
            }
            document.body.className = window.innerWidth < 650 ? 'mobile' : 'desktop';
        }, false);
    };
    
    init();

};

new Resume(window, document);