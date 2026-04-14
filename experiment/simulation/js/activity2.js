function activity2() {
    let btn = (document.getElementById('act1-btn1'));
    btn && btn.remove();
    let btn_text = get_collapse_btn_text('Activity 2', 'act2-div');
    let text = `
   ${btn_text}
   	<div class='collapse divide fs-18px fb-500' id='act2-div'>
    	<h3 style="text-align:center">Activity 2</h3>
      	<h4 style='text-align: left; margin-top:3%' class='fb-600 fs-16px'>Convergence : Case where Bisection Method is faster than False Position Method.</h4>

		<div style='text-align: center;'>
      		$$ f(x) = x^{11} - 1 $$
      
      		<p style="text-align: left; font-size:18px">
				Take initial guess, 
				$$
				x_1 = ${act2_x1}
				$$
				$$
				x_2 = ${act2_x2}
				$$
      		</p>
      		<p style="font-size:18px">Solve and compare Bisection Method and False Position Method</p>
      		<button class='btn btn-info std-btn' onclick='load_table_div();' style='position: relative; left: 0w;' id='load-table-div-btn'>Next</button>
		</div>
   	</div>`;
    maindiv.innerHTML += text;
    hide_all_steps();
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
    setTimeout(() => {
        show_step('act2-div');
    }, 150);
}
function load_table_div() {
    calculate_data();
    let btn = (document.getElementById('load-table-div-btn'));
    btn && btn.remove();
    let btn_text = get_collapse_btn_text('Table Graph', 'table-box');
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='table-box'>
      <h5>Bisection Method</h5>
      
      <div class='text-center my-4' id='bisection-table-div'>
      
      </div>

      <h5>False Position Method</h5>

      <div class='text-center' id='false-position-table-div'>
        
      </div>

      <div class='text-center'>
        <button class='btn btn-info std-btn' onclick='act2_render_graph();' style='position: relative; left: 0w;' id='plot-graph-btn'>Plot Graph</button>
      </div>
      
      
    </div>
  `;
    maindiv.innerHTML += text;
    let bs_tab_data = [];
    let fp_tab_data = [];
    for (let i = 0; i < 10; i++) {
        bs_tab_data.push([i + 1, ...act2_bs_data[i]]);
        fp_tab_data.push([i + 1, ...act2_fp_data[i]]);
    }
    let bs_tab_head = [
        'Iter',
        'x<sub>1</sub>',
        'f(x<sub>1</sub>)',
        'x<sub>2</sub>',
        'f(x<sub>2</sub>)',
        'x<sub>3</sub>',
        'f(x<sub>3</sub>)',
    ];
    let bs_tab_div = (document.getElementById('bisection-table-div'));
    let bs_tab = new Show_Table_Custom_Fixed(bs_tab_head, bs_tab_data, bs_tab_div, 4);
    let fp_tab_head = [
        'Iter',
        'x<sub>1</sub>',
        'f(x<sub>1</sub>)',
        'x<sub>2</sub>',
        'f(x<sub>2</sub>)',
        'x<sub>3</sub>',
        'f(x<sub>3</sub>)',
    ];
    let fp_tab_div = (document.getElementById('false-position-table-div'));
    let fp_tab = new Show_Table_Custom_Fixed(fp_tab_head, fp_tab_data, fp_tab_div, 4);
    bs_tab.load_table();
    fp_tab.load_table();
    hide_all_steps();
    setTimeout(() => show_step('table-box'), 150);
}
function act2_render_graph() {
    let btn = (document.getElementById('plot-graph-btn'));
    btn && btn.remove();
    itr = [];
    bs_data = [];
    fp_data = [];
    for (let i = 0; i < act2_bs_data.length; i++) {
        itr.push(i + 1);
        bs_data.push(act2_bs_data[i][4]);
        fp_data.push(act2_fp_data[i][4]);
    }
    let tb_box = (document.getElementById('table-box'));
    tb_box.innerHTML += `
    <div class="text-center" id='act2-graph-div'>
      <canvas id='plot-graph'></canvas>
    </div>
    <div class='mt-3 text-center'>
      <button class='btn btn-info std-btn' onclick='act2_load_ques();' style='position: relative; left: 0w;' id='load-ques-btn'>Next</button>
    </div>
  `;
    act2_plot_graph();
}
function act2_plot_graph() {
    let div = (document.getElementById('act2-graph-div'));
    div.style.display = 'block';
    // root.id = "act8";
    var ctx = document.getElementById('plot-graph');
    ctx.style.backgroundColor = 'white';
    ctx.style.marginTop = '5px';
    ctx.style.marginLeft = '10%';
    ctx.style.padding = '10px';
    ctx.style.borderRadius = '8px';
    console.log('before if', typeof chart);
    if (typeof chart != 'undefined') {
        chart.destroy();
    }
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: itr,
            datasets: [
                {
                    label: 'Bisection',
                    data: bs_data,
                    fill: false,
                    borderColor: 'red',
                    tension: 0,
                    showLine: true,
                },
                {
                    label: 'False Position',
                    data: fp_data,
                    fill: false,
                    borderColor: 'blue',
                    tension: 0,
                    showLine: true,
                },
            ],
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'f(t)',
                        font: { size: 14, weight: 'bold' },
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 't',
                        font: { size: 14, weight: 'bold' },
                    },
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: 'f(t) vs t',
                    font: { size: 18 },
                },
                legend: { labels: { font: { size: 14, weight: 'bold' } } },
            },
        },
    });
}
function calculate_data() {
    //for bisection method
    for (let i = 0; i < 10; i++) {
        let act2_x3 = (act2_x1 + act2_x2) / 2;
        let f_x1 = act2_f(act2_x1);
        let f_x2 = act2_f(act2_x2);
        let f_x3 = act2_f(act2_x3);
        act2_bs_data.push([act2_x1, f_x1, act2_x2, f_x2, act2_x3, f_x3]);
        if (f_x1 * f_x3 < 0) {
            act2_x2 = act2_x3;
        }
        else {
            act2_x1 = act2_x3;
        }
    }
    //for false position method
    act2_x1 = 0;
    act2_x2 = 1.3;
    for (let i = 0; i < 10; i++) {
        let f_x1 = act2_f(act2_x1);
        let f_x2 = act2_f(act2_x2);
        let act2_x3 = act2_x1 - f_x1 * ((act2_x2 - act2_x1) / (f_x2 - f_x1));
        let f_x3 = act2_f(act2_x3);
        act2_fp_data.push([act2_x1, f_x1, act2_x2, f_x2, act2_x3, f_x3]);
        if (f_x1 * f_x3 < 0) {
            act2_x2 = act2_x3;
        }
        else {
            act2_x1 = act2_x3;
        }
    }
    console.log(act2_bs_data);
    console.log(act2_fp_data);
}
function act2_f(x) {
    return Math.pow(x, 11) - 1;
}
function act2_load_ques() {
    let btn = (document.getElementById('load-ques-btn'));
    btn && btn.remove();
    let tb_div = (document.getElementById('table-box'));
    tb_div.innerHTML += `
    <div id='ques-div' style='font-size:18px;'>
    
    </div>
  `;
    let ques_div = (document.getElementById('ques-div'));
    let ques = new Updated_Question('Which method is faster?', ['Bisection Method', 'False Position Method'], 1, ques_div, act2_ques_success);
    ques.load_question();
    act2_plot_graph();
}
function act2_ques_success() {
    let tb_div = (document.getElementById('ques-div'));
    tb_div.innerHTML += `
    <div class='text-center'>
      <button class='btn btn-info std-btn' onclick='activity3();' style='position: relative; left: 0w;' id='act2-completed-btn'>Next</button>
    </div>
  `;
}
//# sourceMappingURL=activity2.js.map