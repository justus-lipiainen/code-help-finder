function createDom(input, child, elmId, parent) {
    $(child).appendTo(parent);
    $(child).attr("id", elmId);
    $("#" + elmId).text(input);
    console.log(child, elmId, parent);
    return child;
};