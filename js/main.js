var log = console.log.bind(console)

// 把  code 写到 code 和 style 标签里
function writeCode(prefix, code, callback) {
    let domCode =   document.querySelector('#code')
    domCode.innerHTML = prefix || ''
    var n = 0
    var id = setInterval(() => {
        log('write code: ', code.substring(0, n))
        n += 1
        // document.body.innerHTML = result.substring(0, n)
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = 10000
        // domCode.scrollTop = domCode.scrollHeight
        if (n >= code.length) {
            window.clearInterval(id)
            log('砸了一个闹钟')
            if (callback) {
                callback.call()
            }
        }
    }, 1000 / 60)
}

function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    var id = setInterval(() => {
        log('write md')
        n += 1
        domPaper.innerHTML = marked(markdown.substring(0, n))
        domPaper.scrollTop = 10000
        // domCode.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length) {
            window.clearInterval(id)
            log('砸了一个闹钟')
            if (fn) {
                fn.call()
            }
        }
    }, 1000 / 30)
}

var result = ` /*
* 晚上吼啊... 
* 深夜刷知乎 刷到一个治愈的答案。
* 是一首诗
* 但为了看起来不辣么单调
* 首先准备了一些样式
*/

* {
  transition: all 1s;
  font-family: "Helvetica Neue", Helvetica, Arial;
}

html {
    background: rgb(222, 222, 222);
    font-size: 16px;
}

#code {
    border: 1px solid red;
    padding: 8px;
}
/* 加个代码高亮吧 */

.token.selector{
    color: #690;
}
.token.property {
    color: #905;
}
.token.function {
    color: #DD4A68;
}

/* 加点 3d 效果 */
#code {
    transform: rotate(360deg);
}
/* 不玩了 接下来给大家看那首诗 */
/* 呐 我需要一张白纸 */
#code {
    position: fixed;
    left: 0;
    width: 100%;
    height: 30%;
}
#paper {
    position:fixed;
    right: 0;
    top: 30%;
    width: 100%;
    height: 70%;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1px;
}
#paper > .content {
    height: 100%;
    width: 100%;
    background: white;
}`

var result2 = 
` `

// 异步就是 [不等结果] 直接进行下一步
// 我需要回调来拿到异步的结果
// 回调是拿到异步结果的一种方式
// 回调也可以拿同步结果
// writeCode(result2)

// marked.js
var md = 
` # 一次最多放两个
  ***
  ## 你如果
  ## 缓缓的把手举起来
  ## 举到顶
  ## 再突然张开五指
  ## 那恭喜你
  ## 你刚刚给自己放了一个烟花
`

writeCode('', result, ()=> {
    createPaper(()=>{
        log('paper 有了')
        writeCode(result, result2, () => {
            writeMarkdown(md)
        })
    })
})

function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}


