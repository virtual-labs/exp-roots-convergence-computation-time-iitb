let maindiv = (document.getElementById('pannelcreate'));
function activity1() {
    let text = `

   <div class='divide'>
   <div style='margin-top: 2vw;'>
   <h4 class="center-text fs-28px fb-700">Roots of Equation: Convergence and Computation time</h4>
   <br><br>

      <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act1();' id='temp-btn-1' >Next</button>
   </div>
   </div>
   `;
    maindiv.innerHTML = text;
}
//for starting first activity
function start_act1() {
    let temp_btn = (document.getElementById('temp-btn-1'));
    temp_btn && temp_btn.remove();
    let btn_text = get_collapse_btn_text('Activity 1', 'act1-div');
    let text = `
      ${btn_text}
      <div class='collapse center-text divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='act1-div'>
	  	<h4 class="fb-600 fs-28px" style="text-align:center">Activity 1</h4> <br>
		$$ f(x) = x^2 - cos(x) $$
		$$ x_1 = ${x1}, \\ x_2 = ${x2} $$
        <h4 style='text-align: left; margin-top:3%' class='fb-600 fs-16px'>Solve and compare Bisection Method and False Position Method</h4>
         <div id='equ-select-div'>
            <div class="row" style='margin-top:3%'>
               <div class="col-md-5 fs-18px fb-500">
                  <p>Bisection Method</p>
               </div>
            </div>
			$$ x_3 = \\frac{x_1 + x_2}{2} $$

			<button class='btn btn-info std-btn' style='margin: auto;' id='act1-btn-1' onclick='internal_calculations_1();'>Next</button>
   			<div id="act1-tb-box1"></div>
			
			<div id="forml-display-div" class="row" style="display:none; margin-top:5%">
               <div class="col-md-5 fs-18px fb-500">
                  <p>False Position Method</p>
               </div>
			   $$ x_3 = x_1 - f(x_1) * \\frac{x_2-x_1}{f(x_2)-f(x_1)} $$
            </div>
			<button class='btn btn-info std-btn' style='margin: auto; display:none' id='act1-btn-2' onclick='internal_calculations_2();'>Next</button> <br>
			<div id="act1-tb-box2"></div>
         </div>

		 <button class='btn btn-info std-btn' style='margin: auto; display:none; margin-top:3%' id='act1-btn-3' onclick='display_chart();' >Plot Graph</button>

		<div id="graph-div" style="display:none; margin-top:5%">
			<canvas id="act1-graph"></canvas>
			<button class='btn btn-info std-btn' style='margin: auto; display:none; margin-top:3%' id='act1-btn-4' onclick='load_questions();' >Next</button>
		</div>
		<div id="act1-q-box-div" style="margin-top:3%"></div>
	</div>
   `;
    maindiv.innerHTML += text;
    setTimeout(() => MathJax.typeset(), 100);
    hide_all_steps();
    setTimeout(() => {
        show_step('act1-div');
    }, 150);
}
function internal_calculations_1() {
    act1_table_data1 = bisection(x1, x2);
    console.log("act1 tbl ", act1_table_data1);
    let header = ['iter', 'x1', 'f(x1)', 'x2', 'f(x2)', 'x3', 'f(x3)'];
    let tb_box = (document.getElementById('act1-tb-box1'));
    tb_box.innerHTML = '';
    let t = new Show_Table_Custom_Fixed(header, act1_table_data1, tb_box, 5);
    t.load_table();
    let btn = (document.getElementById('act1-btn-1'));
    btn && btn.remove();
    let btn1 = (document.getElementById('act1-btn-2'));
    btn1.style.display = 'block';
}
function internal_calculations_2() {
    let div = (document.getElementById('forml-display-div'));
    div.style.display = 'block';
    act1_table_data2 = false_position(x1, x2);
    console.log("act1 tbl fp ", act1_table_data2);
    let header = ['iter', 'x1', 'f(x1)', 'x2', 'f(x2)', 'x3', 'f(x3)'];
    let tb_box = (document.getElementById('act1-tb-box2'));
    tb_box.innerHTML = '';
    let t = new Show_Table_Custom_Fixed(header, act1_table_data2, tb_box, 5);
    t.load_table();
    let btn = (document.getElementById('act1-btn-2'));
    btn.style.display = 'none';
    let btn1 = (document.getElementById('act1-btn-3'));
    btn1.style.display = 'block';
}
function display_chart() {
    let btn = (document.getElementById('act1-btn-2'));
    btn && btn.remove();
    let btn1 = (document.getElementById('act1-btn-3'));
    btn1 && btn1.remove();
    let div = (document.getElementById('graph-div'));
    div.style.display = 'block';
    var ctx = document.getElementById('act1-graph');
    ctx.style.backgroundColor = 'white';
    ctx.style.marginTop = '5px';
    // ctx.style.marginLeft = '10%';
    ctx.style.padding = '10px';
    ctx.style.borderRadius = '8px';
    if (typeof chart != 'undefined') {
        chart.destroy();
    }
    let x = act1_table_data1.map((data) => data[0]);
    let yb = act1_table_data1.map((data) => data[5]);
    let yfp = act1_table_data2.map((data) => data[5]);
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: x,
            datasets: [
                {
                    label: 'Bisection',
                    data: yb,
                    fill: false,
                    borderColor: 'blue',
                    tension: 0,
                    showLine: true,
                },
                {
                    label: 'False Position',
                    data: yfp,
                    fill: false,
                    borderColor: 'red',
                    tension: 0.5,
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
                        text: 'x3',
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
                    text: `x3 vs iter`,
                    font: { size: 18 },
                },
                legend: { labels: { font: { size: 14, weight: 'bold' } } },
            },
        },
    });
    let btn2 = (document.getElementById('act1-btn-4'));
    btn2.style.display = 'block';
}
function after_verify_table1() {
    let header = ['iter', 'x1', 'f(x1)', 'x2', 'f(x2)', 'x3', 'f(x3)'];
    let tb_box = (document.getElementById('act1-tb-box1'));
    let btn = (document.getElementById('act1-btn-2'));
    btn.style.display = 'block';
    tb_box.innerHTML = '';
    let t = new Show_Table_Custom_Fixed(header, act1_table_data1, tb_box, 5);
    t.load_table();
}
function load_questions() {
    let btn = (document.getElementById('act1-btn-3'));
    btn && btn.remove();
    let btn1 = (document.getElementById('act1-btn-4'));
    btn1 && btn1.remove();
    let outer_div = (document.getElementById('act1-div'));
    let ques = `Which method is faster?`;
    let opt = ['Bisection Method', 'False Position Method'];
    gm_a1 = "False Position Method";
    ans_a1 = gm_a1 == "False Position Method" ? '2' : '1';
    let box = (document.getElementById('act1-q-box-div'));
    let question = new Question_Options(ques, opt, ans_a1, box, 'act1-q-box', verify_answer);
    question.load_question();
    let que = (document.querySelector('#act1-q-box-question-div h5'));
    que.classList.remove('fs-16px');
}
function verify_answer() {
    let graph_div = (document.getElementById('graph-div'));
    let btn = (document.getElementById('act1-btn-4'));
    btn && btn.remove();
    let next_btn = (document.getElementById('act1-btn-5'));
    let root_inp = (document.getElementById('root-val-inp'));
    let func_inp = (document.getElementById('func-val-inp'));
    let text = ans_a1 === '2' ? 'False Position Method' : 'Bisection Method';
    alert(`You are correct, it is ${text}.`);
    activity2();
    //exp_complete();
}
// function exp_complete() {
// 	let btn: HTMLButtonElement = <HTMLButtonElement>(
// 		document.getElementById('act1-btn-5')
// 	);
// 	btn && btn.remove();
// 	alert('Experiment completed');
// }
activity1();
//# sourceMappingURL=activity1.js.map