//window.onload = () => {
const canvas = document.getElementById('canvas');
var ele = document.getElementById("pushbutton");
var ele2 = document.getElementById("popbutton");
const ctx = canvas.getContext('2d');
var arrElmnts = new Array();
var Top = -1;
ctx.lineWidth = 5;
ctx.strokeStyle = 'orange';
let b = 200;
let c = 240;
var data;
data = [13, 23, 34, 44];
function myArray(count) {
    var arrayStartX = 250;
    var arrayStartY = 100;
    let i;
    ctx.font = "20px Georgia";
    ctx.clearRect(250, 100, 300, 40);
    for (i = 0; i < 4; i++) {
        arrElmnts[i] = new element(ctx, canvas, arrayStartX, arrayStartY, 74, 40, data[i]);
        arrElmnts[i].drawArrayElement();
        if (count == undefined || count < i) {
            arrElmnts[i].writeData();
        }
        arrayStartX += 74;
    }
}
function singleElementDeleteStack(stckElmnt, cnt) {
    var myreq;
    stckElmnt[Top].drawStackElement();
    stckElmnt[Top].writeData();
    myStack();
    for (let i = Top; i >= 0; i--) {
        stckElmnt[i].drawPrevElementStack();
        stckElmnt[i].writeData();
    }
    if (stckElmnt[Top].X == 650 && stckElmnt[Top].Y >= 247)
        stckElmnt[Top].incrementY(1);
    else if (stckElmnt[Top].Y > 247)
        stckElmnt[Top].decrementY(1);
    else if (stckElmnt[Top].X < 650)
        stckElmnt[Top].incrementX(1);
    if (stckElmnt[Top].X == 650 && stckElmnt[Top].y == 410) {
        Top--;
        if (Top <= -1)
            ele2.disabled = true;
        if (Top > -1) {
            ctx.fillText("So now " + stckElmnt[Top].data + " is top element in Stack", 270, 80);
            canvas_arrow(ctx, 438, stckElmnt[Top].Y + (40 / 2), 535, stckElmnt[Top].Y + (40 / 2));
            ctx.stroke();
            ctx.fillText("Top", 540, stckElmnt[Top].Y + (40 / 2) + 5);
            ctx.fillText("Popped Element", 635, 390);
            ele2.disabled = false;
        }
        else {
            ctx.fillText("Popped Element", 635, 390);
            ctx.fillText("Stack UnderFlow", 330, 80);
        }
        topValueIndex(Top);
        return;
    }
    myreq = window.requestAnimationFrame(() => { this.singleElementDeleteStack(stckElmnt, cnt); });
}
let fromToY = 287;
let ind = 4;
function demoPop() {
    ele2.disabled = true;
    myStack();
    if (cnt > 0) {
        for (let i = cnt; i <= 0; i--) {
            stckElmnt[i].drawPrevElementStack();
            stckElmnt[i].writeData();
        }
    }
    ctx.clearRect(250, 2, 350, 93);
    ctx.fillText(stckElmnt[Top].data + " is poped from Stack", 300, 50);
    singleElementDeleteStack(stckElmnt, cnt);
}
let height = 40;
function singleElementInsertStack(stckElmnt, stp, cnt) {
    let stop = stp;
    var myreq;
    stckElmnt[Top].drawStackElement();
    stckElmnt[Top].writeData();
    //ctx.fillText(data[cnt],stckElmnt.X+(74/2),stckElmnt.Y+(40/2));
    myArray(cnt);
    myStack();
    let count = cnt;
    for (let i = 0; i < Top; i++) {
        stckElmnt[i].drawPrevElementStack();
        stckElmnt[i].writeData();
        canvas_arrow(ctx, 438, stckElmnt[Top - 1].Y + (40 / 2), 535, stckElmnt[Top - 1].Y + (40 / 2));
        ctx.stroke();
        ctx.fillText("Top", 540, stckElmnt[Top - 1].Y + (40 / 2) + 5);
    }
    if (stckElmnt[Top].Y < 245)
        stckElmnt[Top].incrementY(2);
    else if (stckElmnt[Top].X < 354)
        stckElmnt[Top].incrementX(2);
    else if (stckElmnt[Top].X > 354)
        stckElmnt[Top].decrementX(2);
    else if (stckElmnt[Top].X == 354 && stckElmnt[Top].Y >= 200)
        stckElmnt[Top].incrementY(1);
    Top > 0 ? stp = stckElmnt[Top - 1].Y - 40 : stp = 407;
    if ((stckElmnt[Top].X == 354) && (stckElmnt[Top].Y == stp)) {
        ctx.fillText("So now " + data[cnt] + " is top element in Stack", 270, 80);
        canvas_arrow(ctx, 438, stp + (40 / 2), 535, stp + (40 / 2));
        ctx.stroke();
        ctx.fillText("Top", 540, stp + (40 / 2) + 5);
        ctx.clearRect(354 + 85, stp + 40, 140, height);
        height += 40;
        topValueIndex(Top);
        if (Top != 3)
            ele.disabled = false;
        if (cnt == 3)
            ele.disabled = true;
        ele2.disabled = false;
        return;
    }
    myreq = window.requestAnimationFrame(() => { this.singleElementInsertStack(stckElmnt, stp, cnt); });
}
function myStack() {
    let h = 440;
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(350, 287);
    ctx.lineTo(350, 450);
    ctx.lineTo(432, 450);
    ctx.lineTo(432, 287);
    ctx.stroke();
    ctx.font = "30px Georgia";
    for (let i = 0; i < 4; i++) {
        ctx.fillText(i + "", 300, h);
        h -= 45;
    }
    ctx.font = "20px Georgia";
}
function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}
function topValueElement() {
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'green';
    ctx.fillText("Top Element Index", 600, 85);
    ctx.strokeRect(650, 95, 74, 40);
}
function topValueIndex(num) {
    ctx.clearRect(650 + (74 / 5), 95 + (40 / 5) - 4, 30, 25);
    ctx.fillText(num + "", 650 + (74 / 3), 95 + (40 / 2));
}
let strt = 176;
var stckElmnt = new Array();
var prevElmnt;
let stp = 447;
let cnt = -1;
let inc = 40;
function demoPush() {
    ele.disabled = true;
    ele2.disabled = true;
    ++cnt;
    ++Top;
    stp -= 40;
    ctx.clearRect(250, 2, 350, 93);
    ctx.fillText(data[cnt] + " is pushed in Stack", 300, 50);
    canvas_arrow(ctx, 438, stp + (40 / 2), 535, stp + (40 / 2));
    ctx.strokeRect(438, 200, 20, 20);
    strt += 74;
    stckElmnt[Top] = new element(ctx, canvas, arrElmnts[cnt].x, arrElmnts[cnt].y, 74, 40, data[cnt]);
    singleElementInsertStack(stckElmnt, stp, cnt);
}
myStack();
ctx.font = "40px Georgia";
ctx.fillText("Array=>", 50, 130);
ctx.fillText("Stack=>", 50, 350);
myArray();
topValueElement();
topValueIndex(-1);
ele2.disabled = true;
//# sourceMappingURL=app.js.map