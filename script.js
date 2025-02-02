/* Unconditionally add the CSS rules to the first stylesheet which is
 * available in the page. */
document.styleSheets[0].insertRule('.travis-ci{display:inline-block;margin-left:8px;line-height:1em;position:relative;top:3px;opacity:.85;}', 1);
document.styleSheets[0].insertRule('.travis-ci:hover{opacity:1}', 1);
document.styleSheets[0].insertRule('.travis-ci img{display:block;}', 1);


/* We first check whether the required elements exist on the webpage. If they
 * do not, it means that either the user is looking at something other than
 * a project page, or that github changed their layout and we need to adapt
 * this code. Either way, this ensures that no errors are generated by this
 * extension due to missing DOM elements. */
var actionBar = window.document.querySelector(".file-navigation");
if (actionBar) {
    var btnGroup = actionBar.getElementsByClassName("BtnGroup");
    insertLink(link => {
        if (btnGroup && btnGroup.length > 0 && btnGroup[0].classList.contains('float-right')) {
            actionBar.insertBefore(link, btnGroup[0]);
        } else {
            actionBar.appendChild(link);
        }
    })
}

/* The status icon may not exist, if the project is not registered on
 * travis-ci.org. So we first create the img element and see if an error
 * happens while loading this image. Only if the image exists, we insert the
 * icon into the DOM. */
function insertLink(cb) {
    var project = getProjectURL();

    var container = document.createElement('div');
    container.className = 'float-right';
    var link = window.document.createElement('a');
    getSelectedEnpoint(url => {
        link.href = url + "/f?url=" + project;
        link.target = '_blank';
        link.title = 'Open the project on ' + url;
        link.className = "btn btn-primary ml-2"
        link.appendChild(window.document.createTextNode('Che'));
        container.appendChild(link);
        cb(container);
    })
}

function getProjectURL() {
    var meta = window.document.querySelector('meta[property="og:url"]');
    var url = 'https://github.com/eclipse/che';
    if (meta) {
        url = meta.getAttribute('content');
    }
    return url;
}
