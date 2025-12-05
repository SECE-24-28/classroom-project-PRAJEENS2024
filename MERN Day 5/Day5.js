//Array
//[1,43,5]

//foreach
let ar = [13,5,5]
ar.forEach((ele,i)=>{
    console.log(ele,i)
})

//map
let new_ar = ar.map(e=>(e*2)) // while using paranthesis no need to return anything, for curly brackets we need to return
console.log(new_ar)
console.log(ar)

let new_arr = ar.map(e=>{
    if(e==13){
        return e
    }        
    
})
console.log(new_arr)

//filter
let h = ar.filter(e=>e==5)
console.log(h)

//reduce
let sum = ar.reduce((acc,cur)=>acc+cur,0)
console.log(sum)

//some
let k = ar.some(e=>e==10)
console.log(k)

//every
let ev = ar.every(e=>e==5)
console.log(ev)

//find
let fi = ar.find(e=>e==13)
console.log(fi)

//findIndex
let fii = ar.findIndex(e=>e==13)
console.log(fii)

//push - used to add value at the end of the array
ar.push(12)
console.log(ar)

//pop - used to remove the last value in the array
ar.pop()
console.log(ar)

//unshift - used to add value at the beginning of the array
ar.unshift(90)
console.log(ar)

//shift - used to remove the first value in the array
ar.shift()
console.log(ar)


//splice 
let arr = [2,3,4]
arr.splice(1,0,"add")
console.log(arr)

//fill
let a = new Array(5)
a.fill(5)
console.log(a)

let c = [2,4,5]
let b = c
b[0]= 6
console.log(b)
console.log(c) // both c and d are changed, due to same memory address

// shallow copy - only the e is changed d is not changed
let d = [2,4,5]
let e = [...d]
e[0]= 6
console.log(e)
console.log(d)

let f = [2,4,5,[1,3,5]] // for nested array shallow copy is not applied
let g = [...f]
g[3][0]= 6
console.log(g)
console.log(f)

//deep copy
let x = [2,4,5,[1,3,5]] 
let y = [...f]
x = JSON.parse(JSON.stringify(y))
x[3][0]=9
console.log(x)
console.log(y)

//joining two array
let arr1=[2,3,4,4]
let arr2=[3,6,7,7]
let j =[...arr1,...arr2]
let i = arr1.concat(arr2)
console.log(j)
console.log(i)

//flat -> convert nested array into a normal array
let ar1 = [2,4,5,6,[4,5,6]]
let aar1 = [2,4,5,6,[4,5,6,[1,2,3]]]

console.log(ar1.flat())
console.log(aar1.flat(2))