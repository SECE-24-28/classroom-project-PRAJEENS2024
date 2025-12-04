// //var,let,const
// nam="Prajeen"
// console.log(nam)
// nam="Maries Hari Bose"
// console.log(nam)

// let roll_no=114
// console.log(roll_no)
// roll_no=87
// console.log(roll_no)

// const branch = "ECE"
// console.log(branch)

// function myfriend(){
//     console.log("hari bose")
// }
// myfriend()


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
let ar=[1,2,3,4,5]
fun2(ar)

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
let [a,b,c,d]=arr

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
