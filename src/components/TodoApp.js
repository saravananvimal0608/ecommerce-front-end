import { useState } from 'react'

const TodoApp = () => {
  const [data, setData] = useState([])
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(null)

  const handleAddTask = () => {
    if (input.trim() === "") { return }
    if (editId) {
      const updateData = data.map((d) => d.id === editId ? { ...d, text: input } : d)
      setData(updateData)
    }
    else {
      setData([...data, { id: Date.now(), text: input }])
    }
    setInput('')

  }
  const handleDeleteTask = (id) => {
    const filteredData = data.filter((d) => d.id !== id)
    setData(filteredData)
  }
  const handleEdit = (id) => {
    const edidata = data.find((d) => d.id === id)
    setInput(edidata.text)
    setEditId(id)
  }
  return (
    <div>

      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleAddTask}>add</button>

      {data.map((d) => <ul><li>{d.text}<button onClick={() => handleDeleteTask(d.id)}>delete</button><button onClick={() => handleEdit(d.id)}>edit</button></li></ul>)}
    </div>
  )
}

export default TodoApp