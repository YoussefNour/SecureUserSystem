/*var names = ['Mustafa','Mohamed','Ahmed','Youssef','Amr','Bahaa','Zeid'];
names.sort();
for(i=0;i<names.length;i++){
        console.log(names[i]);
}

var numbers = [10,2,4,5,8,9];
numbers.sort();
for(i=0;i<numbers.length;i++){
        console.log(numbers[i]);
}
*/
/*
var array = [3,4,2,4,5,6,7,5,2,3,4,5,6,10,8,3,4,23,38,654,897,321,984,6,4,5,5,6,5,8,651,51,6,4,64,6,465,654,64,65,0,2,5,87,4,5,6];
MergeSort(array);
//Merge and sort
function Merge(left,right){
        let resultarray = [] , leftindex = 0, rightindex = 0;
        while(leftindex < left.length && rightindex<right.length){
                if(left[leftindex]<right[rightindex]){
                        resultarray.push(left[leftindex]);
                        leftindex++;
                }else{
                        resultarray.push(right[rightindex]);
                        rightindex++;
                }
        }
        return resultarray;
}


function MergeSort(unsortedarray){
        if(unsortedarray.length<=1){
                return unsortedarray;
        }
        const middle = Math.floor(unsortedarray.length);
        const left = unsortedarray.slice(0,middle);
        const right= unsortedarray.slice(middle);
        return Merge(MergeSort(left),MergeSort(right));
}
console.log(array);

/*insertion sort
var i,key,j;
for(i=0;i<array.length;i++){
        key = array[i];
        j = i-1;
        while(j>=0 && array[j]>key){
                array[j+1] = array[j];
                j--;
        }
        array[j+1]=key;
}
*/


function imagefunction(){
        alert("ouch");
}

myobject ={
        name:'joe',
        age:21,
        gender:"male",
        getname:function(){
                return name;
        }
}

