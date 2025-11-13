function createDom(input, child, elmId, parent) {
    $(child).appendTo(parent);
    if (elmId != "") {
        $(child).attr("id", elmId);
    };
    $(child).text(input);
    console.log(child, elmId, parent);
    return child;
};

function newPath(path){
    const currentPath = window.location.pathname;
    const newPath = currentPath + 'newsection';  
    history.pushState({ path: newPath }, '', newPath);
}