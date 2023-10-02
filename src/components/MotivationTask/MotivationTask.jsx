import { completeMotivation, removeMotivation } from "redux/motivationSlice/motivationSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export const MotivationTask = ({ item: { value, completed, id } }) => {
    const [todoChecked, setTodoChecked] = useState(false);
    const item = useSelector(state => state.motivations.items.find(item => item.id === id))
    
    const dispatch = useDispatch();
  const handleCheckbox = () => {
setTodoChecked(!todoChecked)
  }
    return (
      <li key={id}>
            <p>{value}</p>
            {!item.completed && <input type="checkbox" onChange={handleCheckbox} checked={todoChecked} />}
            {item.completed ? <p>Hooray, отримано {item.bonus} грн</p> : <button type="button"
                disabled={!todoChecked}
                onClick={() => dispatch(completeMotivation(id))}
            >{todoChecked ? `Отримай ${item.bonus} грн` : 'Виконано'}</button>}
            {item.completed && <button type="button" onClick={() => dispatch(removeMotivation(id))}>Прибрати таску</button>}
          </li>
          )
}