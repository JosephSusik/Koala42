import React, { useState } from 'react';
import data from './example-data.json'
import RowContent from './components/RowContent';
import Header from './components/Header';
import { DataType } from './dataType';

let dataInit:DataType = [];

data.forEach(element => {
    dataInit.push(element);
});

function App() {
  const [data, setData] = useState<DataType>(dataInit);

  const handleRemoveItem = (superParentIndex:number, has_nemesis?:boolean, has_secrete?:boolean, recordIndex?:number, parentIndex?:number) => {
  
    const tmp = [...data];

    if(!has_nemesis && !has_secrete) { //Delete parent
      tmp.splice(superParentIndex, 1);
      setData(tmp);
    } else if(has_nemesis) { //Delete has_nemesis child
      deleteNemesis(tmp, setData, superParentIndex, recordIndex!)
    } else if (has_secrete) { //Delete has_secrete child      
      deleteSecrete(tmp, setData, superParentIndex, parentIndex!, recordIndex!);
    }
    
  };

  return (
    <div className='wrap'>
      
      <Header item={data[0].data}/>

      {data.map((item:any, index:number) => (          
          <RowContent 
            item={item} 
            handleDelete={handleRemoveItem} 
            firstParentIndex={index} 
            index={index}
          />
        ))}
      
      
    </div>
  );
}

export default App;

//Finds has_nemesis child to delete
function deleteNemesis(data:DataType, setData:Function, superParentIndex:number, recordIndex:number) {
  let recLength = data[superParentIndex].children.has_nemesis!.records

  if(recLength.length === 1) {
    
    delete data[superParentIndex].children.has_nemesis
    setData(data)

  } else {
    
    let record = data[superParentIndex].children.has_nemesis!.records;
    
    record.splice(recordIndex!, 1)

    setData(data)
  }
}

//Finds has_secrete child to delete
function deleteSecrete(data:DataType, setData:Function, superParentIndex:number, parentIndex:number, recordIndex:number) {
  let recLength = data[superParentIndex].children.has_nemesis!.records[parentIndex!].children.has_secrete!.records;

  if(recLength.length === 1) {
          
    delete data[superParentIndex].children.has_nemesis!.records[parentIndex!].children.has_secrete
    setData(data)

  } else {
          
      let record = data[superParentIndex].children.has_nemesis!.records[parentIndex!].children.has_secrete!.records;
      
      record.splice(recordIndex!, 1)

      setData(data)
    }
}