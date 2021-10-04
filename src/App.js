import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [data, setData] = useState([
    {
      id: '0',
      name: 'Teknoloji',
      subMenus: [
        {
          id: '2',
          name: 'Bilgisayar',
          subMenus: []
        }
      ]
    },
    {
      id: '1',
      name: 'Giyim',
      subMenus: []
    },
  ])


  const [inputValue, setInputValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState("10000")

  const inputChange = (e) => {
    setInputValue(e.target.value)
  }

  const onSelectCategory = (e) => {
    setSelectedCategory(e.target.value)
  }

  const onAddCategory = (e) => {
    e.preventDefault();

    const newCategory = {
      id: Math.floor(Math.random() * 1001).toString(),
      name: inputValue,
      subMenus: []
    }

    if (selectedCategory === "10000") {
      setData([...data, newCategory])
    } else {
      //find selected category and add new category
      const addCategory = (categories) => {
        return categories.map(item => {
          if (item.id === selectedCategory) {
            item.subMenus.push(newCategory)
          }
          addCategory(item.subMenus)
          return item

        })
      }


      const newData = addCategory(data)
      setData(newData)
    }
    setInputValue("")
  }

  useEffect(() => {
    const data = localStorage.getItem("data")
    setData(JSON.parse(data))

  }, []);

  useEffect(() => {

    localStorage.setItem("data", JSON.stringify(data));
  });



  //filter, find, map, some, reduce
  //recursive functions

  const renderCategories = (data) => {
    const list = data.map(item => {
      return (
        <ul>
          <li>{item.name}</li>
          {renderCategories(item.subMenus)}
        </ul>
      )
    })

    return list
  }

  const renderDropdown = () => {
    return (
      <select name="categories" id="categories" onChange={onSelectCategory} value={selectedCategory}>
        <option value={10000}>Yok</option>
        {
          data.map(item => {
            return (
              <>
                <option value={item.id}>{item.name}</option>
                {item.subMenus.map(subItem => {
                  return (
                    <option value={subItem.id}>{subItem.name}</option>
                  )
                })}
              </>
            )
          })
        }
      </select>
    )
  }

  return (
    <div className="App">
      <div className="selected">
        <h2>Kategori Ekleme</h2>
        <label htmlFor="">Kategori Adı </label>
        <input type="text" value={inputValue} onChange={inputChange} />
        <label htmlFor="">Üst Kategori </label>
        {renderDropdown()}
        <button onClick={onAddCategory}>Kaydet</button>
      </div>
      <div className="list">
        <h3>Kategori Hiyerarşisi</h3>
        {renderCategories(data)}
      </div>
    </div>
  );
}

export default App;
