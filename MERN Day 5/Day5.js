//Array
//[1,43,5]

//foreach
let ar = [13, 5, 5]
ar.forEach((ele, i) => {
    console.log(ele, i)
})

//map
let new_ar = ar.map(e => (e * 2)) // while using paranthesis no need to return anything, for curly brackets we need to return
console.log(new_ar)
console.log(ar)

let new_arr = ar.map(e => {
    if (e == 13) {
        return e
    }

})
console.log(new_arr)

//filter
let h = ar.filter(e => e == 5)
console.log(h)

//reduce
let sum = ar.reduce((acc, cur) => acc + cur, 0)
console.log(sum)

//some
let k = ar.some(e => e == 10)
console.log(k)

//every
let ev = ar.every(e => e == 5)
console.log(ev)

//find
let fi = ar.find(e => e == 13)
console.log(fi)

//findIndex
let fii = ar.findIndex(e => e == 13)
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
let arr = [2, 3, 4]
arr.splice(1, 0, "add")
console.log(arr)

//fill
let a = new Array(5)
a.fill(5)
console.log(a)

let c = [2, 4, 5]
let b = c
b[0] = 6
console.log(b)
console.log(c) // both c and d are changed, due to same memory address

// shallow copy - only the e is changed d is not changed
let d = [2, 4, 5]
let e = [...d]
e[0] = 6
console.log(e)
console.log(d)

let f = [2, 4, 5, [1, 3, 5]] // for nested array shallow copy is not applied
let g = [...f]
g[3][0] = 6
console.log(g)
console.log(f)

//deep copy
let x = [2, 4, 5, [1, 3, 5]]
let y = [...f]
x = JSON.parse(JSON.stringify(y))
x[3][0] = 9
console.log(x)
console.log(y)

//joining two array
let arr1 = [2, 3, 4, 4]
let arr2 = [3, 6, 7, 7]
let j = [...arr1, ...arr2]
let i = arr1.concat(arr2)
console.log(j)
console.log(i)

//flat -> convert nested array into a normal array
let ar1 = [2, 4, 5, 6, [4, 5, 6]]
let aar1 = [2, 4, 5, 6, [4, 5, 6, [1, 2, 3]]]

console.log(ar1.flat())
console.log(aar1.flat(2))

//problems with array
let arr3 = [1, 2, 3, 4, 6, 7] //find 1 missing number from given array
let missing1 = []
for (let p = 1; p <= arr3.length + 1; p++) {
    if (p != arr3[p - 1]) {
        missing1.push(p)
        break
    }
}

console.log(missing1)

//find 2 or more missing numbers in the array
let arr4 = [1, 3, 4, 6, 7]
let missingmore = []

for (let p = 1; p <= arr4[arr4.length - 1]; p++) {
    if (!arr4.includes(p)) {
        missingmore.push(p)
    }
}

console.log(missingmore)


// find pair of two elements which givve sum = 10
let arr5 = [1, 4, 3, 6, 5]
let sum10 = []

for (let p = 0; p < arr5.length; p++) {
    for (let q = p + 1; q < arr5.length; q++) {
        if (arr5[p] + arr5[q] === 10) {
            sum10.push([arr5[p], arr5[q]])
        }
    }
}

console.log(sum10);


//find max consicutive sub array
let arr6 = [1, 2, 3, 200, 201, 202, 203, 204]
let m_array = 1
let c_array = 1
let start = 0
let end = 0

for (let i = 0; i < arr6.length - 1; i++) {

    if (arr6[i] + 1 === arr6[i + 1]) {
        c_array += 1
        m_array = Math.max(c_array, m_array)
    } 
    else {
        end = i
        m_array = Math.max(c_array, m_array)
        c_array = 1
    }
}

console.log("Longest consecutive length:", m_array)

//arrange all zeros at the end [1,0,4,0,5,0,5]
let arr7 = [1,0,4,0,5,0,5]
let zeroar = []
let nonzeroar = []
for(let i = 0;i<=arr7.length-1;i++){
    if(arr7[i]===0){
        zeroar.push(arr7[i])
    }
    else{
        nonzeroar.push(arr7[i])
    }
}
let total = nonzeroar.concat(zeroar)
console.log(total)


//find max sum sub array - Kadane’s Algorithm
let arr8 = [1, 3, 2, -34, 12, -4, 5, 34]

let maxSum = -Infinity
let curSum = 0

for (let i = 0; i < arr8.length; i++) {
    curSum += arr8[i]
    maxSum = Math.max(maxSum, curSum)
    if (curSum < 0) curSum = 0
}

console.log("Max Sum Subarray =", maxSum)

//find leader element - An element is a leader if everything to its right is smaller.

let arr9 = [34, 5, 6, 2, 68, 32, 5]
let leaders = []
let maxRight = -Infinity

for (let i = arr9.length - 1; i >= 0; i--) {
    if (arr9[i] > maxRight) {
        leaders.push(arr9[i])
        maxRight = arr9[i]
    }
}

leaders.reverse()
console.log("Leaders =", leaders)

//rearrange alternate values [2,3,5,-3,5,-8 ] output -> [2,-3,3,-8,5,5]

let arr10 = [2, 3, 5, -3, 5, -8]
let pos = []
let neg = []

for (let x of arr10) {
    if (x >= 0) pos.push(x)
    else neg.push(x)
}

let res10 = []
let ii = 0, jj = 0

while (ii < pos.length || jj < neg.length) {
    if (ii < pos.length) res10.push(pos[ii++])
    if (jj < neg.length) res10.push(neg[jj++])
}

console.log("Rearranged =", res10)

//find all unique triplets that sum to zero output-> to return all triplets (a,b,c) such that a+b+c=0

let arr11 = [-1, 0, 1, 2, -1, -4]
arr11.sort((a,b) => a-b)

let triplets = []

for (let i = 0; i < arr11.length - 2; i++) {
    if (i > 0 && arr11[i] === arr11[i - 1]) continue

    let left = i + 1
    let right = arr11.length - 1

    while (left < right) {
        let sum = arr11[i] + arr11[left] + arr11[right]

        if (sum === 0) {
            triplets.push([arr11[i], arr11[left], arr11[right]]);
            left++
            right--

            while (arr11[left] === arr11[left - 1]) left++
            while (arr11[right] === arr11[right + 1]) right--
        }
        else if (sum < 0) left++
        else right--
    }
}

console.log("Triplets =", triplets)

//rotate array by kk (using reversal)

let arr12 = [1,2,3,4,5,6,7];
let kk = 3;

kk = kk % arr12.length;

function reverse(arr, left, right) {
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
}

reverse(arr12, 0, arr12.length - 1);
reverse(arr12, 0, kk - 1);
reverse(arr12, kk, arr12.length - 1);

console.log("Rotated Array =", arr12);

