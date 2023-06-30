import { useState } from 'react';
import './styles/RowContent.css'

import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Header from './Header';

interface Row {
    item: any,
    index: number,
    color: number,
    handleDelete: Function,
    child?: boolean
}

function RowContent(props:Row) {
    const [clicked, setClicked] = useState(false)

    const childData = findVal(props.item.children, 'data');
    const childRecords = findVal(props.item.children, 'records');
    const currentData = Object.entries(props.item.data)
    
    return(
        <div>
            <div 
                className={`flex ${props.color%2 === 0? 'dark':'light'}`} 
                onClick={()=>setClicked(!clicked)}
            >
                {childData ?
                    <KeyboardArrowRightIcon 
                        className={clicked? 'rotate':''} 
                    />
                    :
                    <div></div>
                }
            
                {currentData.map(([_, value]:any) => (
                    <div>
                        <p>{value}</p>
                    </div>
                ))}

                
                <DeleteIcon 
                    className='icon'
                    onClick={()=>props.handleDelete(props.index, props.child)}
                />
            </div>
            
            {clicked &&
            <>
                {childData &&
                    <div>
                        <Header item={childData}/>

                        {childRecords.map((item:any, index:number) => (
                                <RowContent 
                                    item={item} 
                                    handleDelete={props.handleDelete} 
                                    index={props.index} 
                                    color={index}
                                    child={true}
                                />
                        ))}
                    </div>
                }
            </>
            }
      </div>
    );
}

export default RowContent;

function findVal(object:any, key:any):any {
    var value;
    Object.keys(object).some(function(k:any) {
        if (k === key) {
            value = object[k];
            return true;
        }
        if (object[k] && typeof object[k] === 'object') {
            value = findVal(object[k], key);
            return value !== undefined;
        }        
        return null;
    });
    return value;
}