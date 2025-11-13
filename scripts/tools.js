function createDom(input, child, elmId, parent) {
    $(child).appendTo(parent);
    if (elmId != "") {
        $(child).attr("id", elmId);
    };
    $(child).text(input);
    console.log(child, elmId, parent);
    return child;
};