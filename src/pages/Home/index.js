import {useState, useEffect, useRef} from "react"
import Edit from "./components/Edit"
import List from "./components/List"
import './index.css'
import {GET_API} from '../../global/constants'
/**
 * 在一个组件中将根文件命名为index.js，那么其他的组件在引用该组件的时候不需要引用到文件，只需要引用到目录就行了
 * 另外下面的这种写法是react的hook方式，class的写法后面可能不会作为主流存在
 * @returns 
 */
/**
 * react中的state放到付节点，子节点之间相互传递都需要经过父节点，不过不相关的节点的状态交互就不太友好了，因此会催生出其他的框架用于状态的管理
 * 另外react中的hook可以理解为函数的意思，我们写的函数是一种hook，react给我们提供的hook也是一种方式
 * @returns 
 */

async function getData(setData) {
    const res = await fetch(GET_API)
    const {data} = await res.json()
    setData(data)
}

async function fetchSetData(data) {
    await fetch(GET_API, {
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({data})
    })
}
const Home = ()=>{
    // 通过简单的声明变脸无法对其进行更新并渲染到页面上，因为react的jsx不认识这个变量
        // let a = 100;
        // function plus() {
        //     console.log(a)
        //     a = a+100;
        // }
    // 通过这种方式可以简单的认为useState是a的构造函数，并指定了变量的get、set函数
    // const [a, setA] = useState(100)
    // function plus() {
    //     // 这一步是get和set函数的标准组合模式
    //     setA(function(pre) {
    //         return pre + 100;
    //     })
    // }
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])


    // useEffect也是一个hook，雷避雨useState，其自身也可以视为一个构造函数，只是这里的构造函数参数
    // 有两个，一个是函数，一个是该函数的依赖
    // 当useEffect存在多个依赖的情况下，只要有任意一个依赖变动了，都会有相应的effect产生
    // useState是哪部的状态做了调整，useEffect是和外部系统有交互的情况，因此通常是用来和服务端打交道
        // useEffect(() => {
        //     window.alert("hello world")
        // }, [data])
    
    // useEffect是想要component做的事情的表现

    // useEffect可以用来执行初始化的东西，如下只需要指定其依赖的state为空就行了：
    // 并且useEffect是想要和useState进行捆绑起来的内容，因此定义state的地方使用effect
    // state有变更的时候就会重新执行effect
    useEffect(() => {
        // useEffect调用useState的方法将从外部获取到的内容传入到内部的状态
        getData(setData)
        // 这种写法是promise的写法，一般是
            // fetch(GET_API)
            // .then(res => res.json())
            // .then(data => {
            //     console.log(data)
            // })
    }, [])

    // 上面是初始化数据，接下来是页面每次有数据更新的时候需要执行数据刷新的函数，仅仅是数据更新的时候，也就是说当前页面已经载入过了
    // 因此这里使用useEffect（每次页面初始化都会被执行）就需要判断是数据更新还是页面初始化
    useEffect(() => {
        if(changeData.current) {
            fetchSetData(data).then(changeData.current=false)
        }
    }, [data])
    const changeData = useRef(false)
    return <div>
        {/* {a}
        <button onClick={plus}>加法</button> */}
        <Edit add={setData} changeData={changeData}></Edit>
        <List listData={data} deleteData={setData} changeData={changeData}></List>
    </div>
}

export default Home;

/// 牢记一点state和effect基本是成对出现的，并且有effect出现的地方useRef多半也会出现
// useRef将参数传递到子节点，子节点在改变状态之前修改ref的值，最终数据的变动导致useEffect的执行
// effect在执行完成后将对应的ref重置，整个生态就完成了所有的业务