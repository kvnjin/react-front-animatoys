
import './Counter.css';

const Counter = ({ count, setCount, stockLevel }) => {
  const increment = () => {
    if (count < stockLevel) setCount(count + 1)
  }

  const decrement = () => {
    if (count > 1) setCount(count - 1)
  }

  return (
    <div className="btn-group">
      <button className="decrement-btn" onClick={decrement} disabled={count <= 1}>-</button>
      <span>{count}</span>
      <button className="increment-btn" onClick={increment} disabled={count >= stockLevel}>+</button>
    </div>
  )
}


export default Counter;