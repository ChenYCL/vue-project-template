// const path = require('path');
// const fs = require('fs')
// const resolve = dir => {
//     return path.join(__dirname, "../", dir);
// };
//
// const imgPath = resolve('/assets/images')

// const readDir = fs.readdirSync(imgPath)
// console.log(readDir)  // 获取所有图片列表 或者 使用public文件内放置图片

export const readDir = [
    'bj.png',
    // ...
]


export const imgPreload =(imgArr)=>{
    for(let i=0;i<imgArr.length;i++){
        const newImg = new Image();
        newImg.src = require("assets/images/"+imgArr[i])
    }
}



