// *JAVASCRIPT*

//can re-declare
var nam="PRAJEEN S"
console.log(nam)
var nam="hello"
console.log(nam)

//cannot re-declare
let rol="21"
console.log(rol)
//let rol="22"

//cannot re-assign the value
const branch="ECE"
console.log(branch)
// branch="IT"
// console.log(branch)

//NORMAL FUNCTION
function nam1(){
    console.log("HELLO")
}
nam1();

//FUNCTION EXPRESSION
var funs=function(){
    console.log("first")
}
funs()

//ARROW FUNCTION
let arrow=()=>{
    console.log("arrow")
}
arrow()


function myfriend(){
    console.log("hari bose")
}
myfriend()


let fun=()=>{
    var branch = "ECE"
    console.log("first")
    let hii = "hii"
    console.log(hii)

    if(true){
        console.log(branch,hii,'from if block')
    }
    if(true){
        const hello= "hello"
        console.log(hello)
    }
}
fun()


let fun1=(a,b)=>{
    console.log(a+b)
}
fun1(1,2)


let fun2=(a)=>{
    console.log(a)
}
let arrr=[1,2,3,4,5]
fun2(arrr)


let fun3=(a,b,c,d,e)=>{
    console.log(a,b,c,d,e)
}
let arr=[1,2,3,4,5]
fun3(...arr)


let fun4=(...a)=>{
    console.log(a)
}
fun4(1,3,5)

let arr1=[1,2,3,4]
let [w,x,y,z]=arr


const fun5=()=>{

    let data = "data"
    const hello=()=>{
        console.log("first")
        console.log(data)
    }
    return hello
}
let h = fun5()
h()


let fun6=(a)=>{
    a()

}
let child=()=>{
    console.log("child")
}
fun6(child)


var name1 = "prajeen"
let stop = setInterval(()=>{
    console.log("from interval")
},1000)

setTimeout(()=>{
    console.log("from timer")
},1000)

setTimeout(()=>{
    clearInterval(stop)
},5000)

console.log(name1)


const fun7=()=>{
    let time = 1000
    setTimeout(()=>{
        console.log(time)
    },1000)
}
fun7()


for(var i=0;i<10;i++){
    setTimeout(()=>{
        console.log(i)
    },1000)
    console.log(i)
}

for(var i = 0;i<10;i++){
    function name(a){
        setTimeout(()=>{
            console.log(a)
        },1000)
    }
    name(i)
}


let n=10
console.log(typeof(n))


let m=10,b="20"
b=Number(b)
m=String(m)
console.log(typeof(b))
console.log(typeof(m))

//ARITHMETIC
console.log(Math.floor(7/3))
console.log(Math.floor(-7/3))

//comparision operators
let o=10,t='10'
console.log(o==t) 
console.log(o===t)

//ternary operator

true?console.log("TRUE"):console.log("FALSE")

// template literals
let aa = "HELLO";
console.log(`hello ${aa} ${2+3}`);

let a = 10;
switch(a){
    case 10:
        console.log("pass");
        break;
    case 20:
        console.log("fail");
        break;
}


//print the values
let ar=[1,2,3,4]
for(let i of ar){
    console.log(i)
}

//print the index
let aar=[1,2,3,4]
for(let i in ar){
    console.log(i)
}