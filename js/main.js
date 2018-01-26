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
    }, 1000 / 1000)
}

function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    var id = setInterval(() => {
        log('write md')
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = 10000
        // domCode.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length) {
            window.clearInterval(id)
            log('砸了一个闹钟')
            if (fn) {
                fn.call()
            }
        }
    }, 1000 / 60)
}

var result = ` /*
* 面试官你好，我是xxx
* 我将以动画的形式来介绍我自己

* 只用文字介绍太单调了
* 我就用代码来介绍吧

* CRM Copy Run Modify
* animationresume

* 首先准备一些样式
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
/* 不玩了 我来介绍一下我自己 */
/* 呐 我需要一张白纸 */
#code {
    position: fixed;
    left: 0;
    width: 50%;
    height: 100;
}
#paper {
    position:fixed;
    right: 0;
    width: 50%;
    height: 100%;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
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

var md = 
` # 标题1
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


