import React, { useState } from 'react';
import data from './example-data.json'
import RowContent from './components/RowContent';
import Header from './components/Header';
import { DataType } from './dataType';

let dataInit:any[] = [];

data.forEach(element => {
    dataInit.push(element)
});

function App() {
  const [data, setData] = useState<DataType>(dataInit);

  const handleRemoveItem = (index:number) => {
    const tmp = [...data];
    tmp.splice(index, 1);
    setData(tmp);
  };

  return (
    <div className='wrap'>
      
      <Header item={data[0].data}/>

      {data.map((item:any, index:number) => (          
        <RowContent 
          item={item} 
          handleDelete={handleRemoveItem} 
          index={index} 
          color={index}
        />
      ))}

      
    </div>
  );
}

export default App;
