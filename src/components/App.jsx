import { addMotivation } from "redux/motivationSlice/motivationSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { MotivationTask } from "./MotivationTask/MotivationTask";


export const App = () => {
  
  const motivations = useSelector(state => state.motivations.items);
  const [bonuses, setBonuses] = useState(0);
  const [sumShown, setSumShown] = useState(false);
  const dispatch = useDispatch();
 
  const handleSubmit = e => {
    e.preventDefault();
    const todo = e.target.elements.todo.value;
    const bonus = e.target.elements.bonus.value;
    
    const newTodo = {
      value: todo,
      bonus,
      completed: false,
      id: nanoid(),
    }
    dispatch(addMotivation(newTodo))
    e.currentTarget.reset();
  }

  useEffect(() => {
    const handleBonusSum = () => {
 
    let totalRating = 0;
    for (const motivation of motivations) {
      if (motivation.completed) {
        totalRating += Number.parseInt(motivation.bonus);
      }
          }
    setBonuses(totalRating)
      }
    handleBonusSum();
  },[motivations, bonuses])
    return (
    <>
      <form onSubmit={handleSubmit}>
          <label>
            Задача
          <input
          type='text'
              name="todo"
            required/>
          </label>
          <label>
            Бонуси
          <input
          type='text'
              name="bonus"
            required/>
      </label>
        <button>Додати мотивашку</button>
      </form>
      <ul>
          {motivations.map(item => <MotivationTask key={item.id} item={item}  />)}
        </ul>
        {motivations.length > 0 && motivations.find(item=>item.completed === true) && <>
          <button type="button" onClick={() => setSumShown(!sumShown)}>{sumShown ? "Приховати" : "Підрахувати"}</button>
          {sumShown && <p>У вас {bonuses} бонусів</p>}
        </>  
       }
    </>
  );
};
