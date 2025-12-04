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


// let fun=()=>{
//     var branch = "ECE"
//     console.log("first")
//     let hii = "hii"
//     console.log(hii)

//     if(true){
//         console.log(branch,hii,'from if block')
//     }
//     if(true){
//         const hello= "hello"
//         console.log(hello)
//     }
// }
// fun()


// let fun1=(a,b)=>{
//     console.log(a+b)
// }
// fun1(1,2)


// let fun2=(a)=>{
//     console.log(a)
// }
// let ar=[1,2,3,4,5]
// fun2(ar)


// let fun3=(a,b,c,d,e)=>{
//     console.log(a,b,c,d,e)
// }
// let arr=[1,2,3,4,5]
// fun3(...arr)


// let fun4=(...a)=>{
//     console.log(a)
// }
// fun4(1,3,5)

// let arr1=[1,2,3,4]
// let [a,b,c,d]=arr


// const fun5=()=>{

//     let data = "data"
//     const hello=()=>{
//         console.log("first")
//         console.log(data)
//     }
//     return hello
// }
// let h = fun5()
// h()


// let fun6=(a)=>{
//     a()

// }
// let child=()=>{
//     console.log("child")
// }
// fun6(child)


// var name1 = "prajeen"
// let stop = setInterval(()=>{
//     console.log("from interval")
// },1000)

// setTimeout(()=>{
//     console.log("from timer")
// },1000)

// setTimeout(()=>{
//     clearInterval(stop)
// },5000)

// console.log(name1)


// const fun7=()=>{
//     let time = 1000
//     setTimeout(()=>{
//         console.log(time)
//     },1000)
// }
// fun7()


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