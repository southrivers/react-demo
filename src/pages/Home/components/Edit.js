import { useState } from "react";
import { v4 } from "uuid";
// 通过props在组件之间进行传递功能或者数据，对于一个组件，左边的为props，右边的为函数
// 接受props传过来的内容需要用花括号括起来，同时和其props保持一致，即props定义成什么这里参数就写成什么
const Edit = ({add, changeData}) => {

    // 包一层会比较好一点，这样可操控性更大
    function addItem() {
        
        add(function(prev) {
            //牢记调用useState的set方法的时候通过函数的方式获取前面的值，并更新现有的值
            changeData.current = true;
            return [ {
                id: v4(),
                note,
                date,
                time,
            },...prev]
        })
    }
    // 子组件传递数据到父组件也必须通过useState的方式进行传递
    const [note, setNote] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    function noteChange(e) {
        setNote(e.target.value)
    }
    function dateChange(e) {
        setDate(e.target.value)
    }
    function timeChange(e) {
        setTime(e.target.value)
    }
    return <div>
        <p>备忘录</p>
        <input type="text" value={note} onChange={noteChange}/>
        <p>日期</p>
        <input type="date" value={date} onChange={dateChange}/>
        <p>时间</p>
        <input type="time" value={time} onChange={timeChange}/>
        <button className="add" onClick={addItem}>新增</button>
    </div>
}

export default Edit;