function activity4() {
    let btn = (document.getElementById('act1-btn1'));
    btn && btn.remove();
    let btn_text = get_collapse_btn_text('Activity 4', 'act4-div');
    let text = `
   	${btn_text}
		<div class='collapse divide fs-18px fb-500' id='act4-div'>
   			<h2 style='text-align: left; margin-top:3%' class='fb-600 fs-20px'>Slow convergence of newton raphson method when slope (f'(x)) tends to become zero</h2>
			<br>
			<h3 style="text-align:center">Activity 4</h3>
      		$$ f(x) =  x^{10} - 1 $$
			$$ Take \\ initial \\ guess \\ x = ${act4_x1} $$
      
      		<div class="row" style='margin-top:3%'>
         		<div class="col-md-5 fs-18px fb-500">
           			<p>Newton Raphson Method</p>
         		</div>
      		</div>
			$$ x_{new} = x - \\frac{f(x)}{f'(x)} $$
			$$ f'(x) = 10x^9 $$

      		<p style='text-align:center;'><button class='btn btn-info std-btn' style='margin: auto;' id='act4-btn-1' onclick='act4_internal_calculations_1();'>Next</button></p>
   			<div id="act4-tb-box1"></div>

      		<p style='text-align:center;'><button class='btn btn-info std-btn' style='margin: auto; display:none;' id='act4-btn-2' onclick='act4_display_chart();'>Next</button></p>

      		<button class='btn btn-info std-btn' style='margin: auto; display:none; margin-top:3%' id='act4-btn-3' onclick='act4_display_chart();' >Plot Graph</button>

      		<div id="act4-graph-div" style="display:none; margin-top:5%">
				<canvas id="act4-graph"></canvas>
				<button class='btn btn-info std-btn' style='margin: auto; display:none; margin-top:3%' id='act4-btn-4' onclick='exp_complete();' >Next</button>
			</div>
   		</div>`;
    maindiv.innerHTML += text;
    hide_all_steps();
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
    setTimeout(() => {
        show_step('act4-div');
    }, 150);
}
function act4_internal_calculations_1() {
    act4_table_data1 = act4_newton_raphson(act4_x1);
    console.log("act4 newton raphson table ", act4_table_data1);
    let header = ['iter', 'x1', 'x<sub>new</sub>', 'f(x<sub>new</sub>)'];
    let tb_box = (document.getElementById('act4-tb-box1'));
    tb_box.innerHTML = '';
    let t = new Show_Table_Custom_Fixed(header, act4_table_data1, tb_box, 5);
    t.load_table();
    let btn = (document.getElementById('act4-btn-1'));
    btn && btn.remove();
    let btn1 = (document.getElementById('act4-btn-2'));
    btn1.style.display = 'block';
}
// function act3_internal_calculations_2() {
//    let div: HTMLDivElement = <HTMLDivElement>(document.getElementById('act3-forml-display-div'));
// 	div.style.display = 'block';
//    act3_table_data2 = one_point(act3_x1);
// 	console.log("one point table ",act3_table_data2);
//    let header = ['iter', 'x1', 'x<sub>new</sub>', 'f(x<sub>new</sub>)'];
// 	let tb_box: HTMLDivElement = <HTMLDivElement>(document.getElementById('act3-tb-box2'));
// 	tb_box.innerHTML = '';
// 	let t = new Show_Table_Custom_Fixed(header, act3_table_data2, tb_box, 5);
// 	t.load_table();
//    let btn: HTMLButtonElement = <HTMLButtonElement>(document.getElementById('act3-btn-2'));
// 	btn && btn.remove();
//    let btn1: HTMLButtonElement = <HTMLButtonElement>(document.getElementById('act3-btn-3'));
//    btn1.style.display = 'block';
// }
function act4_display_chart() {
    let btn = (document.getElementById('act4-btn-2'));
    btn && btn.remove();
    let btn1 = (document.getElementById('act4-btn-3'));
    btn1 && btn1.remove();
    let div = (document.getElementById('act4-graph-div'));
    div.style.display = 'block';
    var ctx = document.getElementById('act4-graph');
    ctx.style.backgroundColor = 'white';
    ctx.style.marginTop = '5px';
    // ctx.style.marginLeft = '10%';
    ctx.style.padding = '10px';
    ctx.style.borderRadius = '8px';
    if (typeof chart != 'undefined') {
        chart.destroy();
    }
    let x = act4_table_data1.map((data) => data[0]);
    let ynr4 = act4_table_data1.map((data) => data[2]);
    // let yop = act3_table_data2.map((data) => data[2]);
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: x,
            datasets: [
                {
                    label: 'Newton Raphson Method',
                    data: ynr4,
                    fill: false,
                    borderColor: 'blue',
                    tension: 0,
                    showLine: true,
                }
            ],
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'x new',
                        font: { size: 14, weight: 'bold' },
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'iter',
                        font: { size: 14, weight: 'bold' },
                    },
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: `x new vs iter`,
                    font: { size: 18 },
                },
                legend: { labels: { font: { size: 14, weight: 'bold' } } },
            },
        },
    });
    let btn2 = (document.getElementById('act4-btn-4'));
    btn2.style.display = 'block';
}
// function act3_load_questions() {
// 	let btn: HTMLButtonElement = <HTMLButtonElement>(document.getElementById('act3-btn-4'));
// 	btn && btn.remove();
// 	let outer_div: HTMLDivElement = <HTMLDivElement>(
// 		document.getElementById('act3-div')
// 	);
// 	let ques: string = `Which method is faster?`;
// 	let opt: string[] = ['Newton Raphson Method', 'One Point Iteration Method'];
// 	gm_a2 = "Newton Raphson Method";
// 	ans_a2 = gm_a2 == "Newton Raphson Method" ? '1' : '2';
// 	let box: HTMLDivElement = <HTMLDivElement>(
// 		document.getElementById('act3-q-box-div')
// 	);
// 	let question = new Question_Options(
// 		ques,
// 		opt,
// 		ans_a2,
// 		box,
// 		'act3-q-box',
// 		act3_verify_answer
// 	);
// 	question.load_question();
// 	let que: HTMLElement = <HTMLElement>(
// 		document.querySelector('#act3-q-box-question-div h5')
// 	);
// 	que.classList.remove('fs-16px');
// }
// function act3_verify_answer() {
// 	let graph_div: HTMLDivElement = <HTMLDivElement>(
// 		document.getElementById('act3-graph-div')
// 	);
// 	let btn: HTMLButtonElement = <HTMLButtonElement>(
// 		document.getElementById('act3-btn-4')
// 	);
// 	btn && btn.remove();
// 	// let next_btn: HTMLButtonElement = <HTMLButtonElement>(
// 	// 	document.getElementById('act1-btn-5')
// 	// );
// 	let text: string = ans_a1 === '1' ? 'Newton Raphson Method' : 'One Point Iteration Method'; 
// 	alert(`You are correct, it is ${text}.`);
// 	exp_complete();
// }
function exp_complete() {
    let btn = (document.getElementById('act4-btn-4'));
    btn && btn.remove();
    alert('Experiment completed');
}
//# sourceMappingURL=activity4.js.map