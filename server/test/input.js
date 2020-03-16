let data = [
  { id: 1, name: "Doremon", type: "anime", country: "Japan" },
  { id: 2, name: "Sword Art Online", type: "anime", country: "Japan" },
  { id: 3, name: "Beauty and The Beast", type: "disney", country: "USA" },
  { id: 4, name: "Xmen", type: "science", country: "USA" },
  { id: 5, name: "Avenger", type: "science", country: "USA" }
];

let movie = 4;
let features = 2; //number of data features
let matrix = []; // matrix storing result
for (let i = 0; i < data.length; i++) {
  var similarities = 0; // số lượng features giống nhau

  //so sánh từng features của data[movie] với data[i]
  if (data[movie].type == data[i].type) {
    similarities++;
  }
  if (data[movie].country == data[i].country) {
    similarities++;
  }
  matrix.push(similarities / features); //tương quan giống nhau giữa data[movie] và data[i]
}
//kq matrix
console.log(matrix);

//sort

var valueArray = [];
var indexArr = [];

//copy matrix to valueArray
valueArray = [...matrix];

// push index/name/id/... into array
for (let i = 0; i < matrix.length; i++) {
  indexArr.push(data[i].name);
}

//sort valueArray
for (let i = 0; i < valueArray.length; i++) {
  for (let j = i + 1; j < valueArray.length; j++) {
    if (valueArray[j] > valueArray[i]) {
      //swap value
      let tempValue = valueArray[j];
      valueArray[j] = valueArray[i];
      valueArray[i] = tempValue;

      //swap index
      let tempIndex = indexArr[j];
      indexArr[j] = indexArr[i];
      indexArr[i] = tempIndex;
    }
  }
}
console.log(valueArray);
console.log(indexArr);
