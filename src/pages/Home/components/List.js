import Item from "./Item"

// const arr = ["hello world",2,3]
/**
 * js 的执行是要求js被{}包围起来，只要在jsx里面写js都需要用{}，无论多少层
 * @returns 
 */
const List = ({listData, deleteData, changeData}) => {
    return <div className="list">
        {/* {
            arr.map(item => {
                return <div>{item}</div>
            })
        } */}
       {
           listData.map(item => {
               // 使用析构函数快速降对象分解成想要的内容，并且可以避免空指针
               const {id, note, date, time} = item
               return <Item key={id} id={id} note={note} date={date} time={time} delData={deleteData} changeData={changeData}/>
           })
       }
    </div>
}

export default List;