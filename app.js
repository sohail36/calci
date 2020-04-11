var second_div=document.querySelector('.second');
var first_div=document.querySelector('.first');
var point=0;
var all=document.querySelectorAll('.button');
all.forEach(ele => {
    ele.addEventListener('click',checkfun);
});


function checkfun(){
    if(this.classList.contains('clear')||this.classList.contains('del')){
        first_div.innerHTML=0;
        second_div.innerHTML="";
        point=0;
    }
    else if(this.classList.contains('operator')){
        addoperator(this.innerHTML);
    }
    else if(this.classList.contains('equal')){
        if(evaluate(second_div.innerHTML))
        equalize();
    }
    else
    addcontent(this.innerHTML);
}

function addoperator(operand){
    point=0;
    var str=second_div.innerHTML;
    var i=str.length-1;
    if(str[i]=='-' && str.length>2){
        if(str[i-1]=='*'||str[i-1]=='÷'){
            str=str.slice(0,str.length-2);
            str+=operand;
            second_div.innerHTML=str;
            return;
        }
    }
    if(str[i]=='÷'||str[i]=='*'){
        if(operand=='-'){
            addcontent(operand);
            return;
        }
        else{
            str=str.slice(0,str.length-1);
            str+=operand;
            second_div.innerHTML=str;
            return;
        }
    }

    if(str[i]=='+'||str[i]=='-'){
    str=str.slice(0,str.length-1);
    str+=operand;
    second_div.innerHTML=str;
    return;
    }
    if(str.length>0||operand=='-')
    addcontent(operand);
}

function addcontent(val){
    if(val=='.'&&point>0)
    return;
    if(val=='.')
    point++;
    second_div.innerHTML+=val;
    evaluate(second_div.innerHTML);
}

function evaluate(exp){
   exp=exp.replace(/÷/g,'/');   
    try{
    if(/[+*/-]/.test(exp))
        first_div.innerHTML=eval(exp);
        return true;
    }
    catch(e){ 
        if(e.message=="Invalid regular expression: missing /"){
        first_div.innerHTML="Expression Error";
        return false;
        }
        else if(e.message=="Unexpected token '*'"){
            first_div.innerHTML="Expression Error";
            return false;    
        }
    }
    
}

function equalize(){
    var exp=second_div.innerHTML;
    exp=exp.replace(/÷/g,'/'); 
    if(/[+*/-]/.test(exp)&&first_div.innerHTML!=""){
        first_div.classList.add('firstadd');
        second_div.classList.add('secondadd');
        setTimeout(rem,300);
    }
}
function rem(){
    second_div.classList.remove('secondadd');
    first_div.classList.remove('firstadd');
    second_div.innerHTML=first_div.innerHTML;
    first_div.innerHTML="";
    
}


