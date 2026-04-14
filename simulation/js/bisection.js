// declare var math;
function f(xx) {
    return ((Math.pow(xx, 2)) - (Math.cos(xx)));
}
function df(xx) {
    return ((2 * xx) + Math.sin(xx));
}
function g(xx) {
    return (Math.sqrt(Math.cos(xx)));
}
function bisection(x1, x2) {
    let table = [];
    for (let i = 0; i < 10; i++) {
        table[i] = [];
        let x3 = (x1 + x2) / 2;
        table[i][0] = i + 1;
        table[i][1] = x1;
        table[i][2] = f(x1);
        table[i][3] = x2;
        table[i][4] = f(x2);
        table[i][5] = x3;
        table[i][6] = f(x3);
        if (f(x1) * f(x3) < 0) {
            x2 = x3;
        }
        else {
            x1 = x3;
        }
    }
    return table;
}
function false_position(x1, x2) {
    let table = [];
    for (let i = 0; i < 10; i++) {
        table[i] = [];
        // let x3 = (x1 + x2) / 2;
        let x3 = x1 - f(x1) * ((x2 - x1) / (f(x2) - f(x1)));
        table[i][0] = i + 1;
        table[i][1] = x1;
        table[i][2] = f(x1);
        table[i][3] = x2;
        table[i][4] = f(x2);
        table[i][5] = x3;
        table[i][6] = f(x3);
        if (f(x1) * f(x3) < 0) {
            x2 = x3;
        }
        else {
            x1 = x3;
        }
    }
    return table;
}
function newton_raphson(x1) {
    let table = [];
    for (let i = 0; i < 10; i++) {
        table[i] = [];
        let x2 = x1 - f(x1) / df(x1);
        table[i][0] = i + 1;
        table[i][1] = x1;
        table[i][2] = x2;
        table[i][3] = f(x2);
        x1 = x2;
    }
    return table;
}
function one_point(x1) {
    let table = [];
    for (let i = 0; i < 10; i++) {
        table[i] = [];
        let x2 = g(x1);
        table[i][0] = i + 1;
        table[i][1] = x1;
        table[i][2] = x2;
        table[i][3] = f(x2);
        x1 = x2;
    }
    return table;
}
function act4_f(xx) {
    return ((Math.pow(xx, 10)) - 1);
}
function act4_df(xx) {
    return ((10 * (Math.pow(xx, 9))));
}
function act4_newton_raphson(x1) {
    let table = [];
    for (let i = 0; i < 50; i++) {
        table[i] = [];
        let x2 = x1 - act4_f(x1) / act4_df(x1);
        table[i][0] = i + 1;
        table[i][1] = x1;
        table[i][2] = x2;
        table[i][3] = act4_f(x2);
        x1 = x2;
    }
    return table;
}
//# sourceMappingURL=bisection.js.map