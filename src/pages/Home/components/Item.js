
/**
 * 
 * @returns 区分jsx和一般的js函数的根本点在于函数的返回值，如果返回值被div包裹，那么就是
 */
// 为什么函数经过层层的传递，传递到最里面，而不是传到list就截止了呢？，因为删除按钮在这里
const Item = ({id, note, date, time, delData, changeData})=>{

    // TODO ...代表什么意思呢？应该是打平吧
    function del() {
        changeData.current = true;
        delData(function(prev) {
            // 所有的函数千万不要忘记return，否则会出问题的
            return prev.filter(item => item.id !== id)
        })
    }
    return <div className="item">
        <div>{note}</div>
        <div>{`${date} ${time}`}</div>  
        <button className="remove" onClick={del}>删除</button>
    </div>
}

export default Item;