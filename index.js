function home(){
    window.location.href = location.origin + location.pathname;
}
function copy(text){
    if(!navigator.clipboard){
        alert("あなたの使用しているブラウザはコピーに対応していません。")
    }
    navigator.clipboard.writeText(text).then(
        () => {
            alert('リンクコピーしました。')
        },
        (err) => {
            console.error('リンクコピーできませんでした。エラー:', err);
            alert('リンクコピーできませんでした。');
        }
    )
}

const params = new URLSearchParams(window.location.search);

const generate = document.getElementById("Generate");
const evaluate = document.getElementById("evaluate");
const output = document.getElementById("output");
const errorelm = document.getElementById("error");
const errorcontent = document.getElementById("errorcontent");
const showprogram = document.getElementById("showprogram");
const program = document.getElementById("program");

let problem = null;

generate.addEventListener('click',function(){ //URLとして生成
    let outputText = document.getElementById('inputjs').value;
    //プログラムをパラメータに入れられるようにエンコード
    outputText = encodeURIComponent(outputText); 
    outputText = outputText.replace(/\(/g, '%28').replace(/\)/g, '%29');
    
    output.textContent = location.origin + location.pathname + '?js=' + outputText;
});
evaluate.addEventListener('click',function(){ //プログラムを実行。
    try{
        new Function(document.getElementById('inputjs').value)();
        problem = null;
        errorelm.style.display = "none";
        errorcontent.textContent = "OH!! Why Can you look this?";
    }catch(error){
        problem = "Error: " + error;
        console.log(error);
        errorelm.style.display = "block";
        errorcontent.textContent = error;
    }
    // const script = document.createElement('script');
    // script.innerHTML = `${document.getElementById('inputjs').value}`;
    // document.body.appendChild(script);
});
output.addEventListener('click',() => { //リンクを押されたときにそのリンクをコピーする。
    copy(output.textContent);
});
showprogram.addEventListener('click',() => { //ボタンが押されたときにプログラムを表示する。
    program.textContent = params.get('js');
    program.style.display = 'block';
});

if(params.get('js')){
    document.getElementById('run').style.display = "block";
    let codeString = params.get('js') + '';
    codeString = decodeURIComponent(codeString);

    // Functionコンストラクタを使って文字列を実行
    try{
        new Function(codeString)();
        problem = null;
    }catch(error){
        problem = "Error: " + error;
        console.log(error);
    }
}else{
    document.getElementById('creater').style.display = "block";
}