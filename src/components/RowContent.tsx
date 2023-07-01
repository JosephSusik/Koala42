import { useState } from 'react';
import './styles/RowContent.css'

import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Header from './Header';

interface Row {
    item: any,
    firstParentIndex: number,
    index: number,
    handleDelete: Function,
    child?: boolean,
    hasNemesis?: boolean
    hasSecrete?: boolean
    parentIndex?:number
}

function RowContent(props:Row) {
    const [clicked, setClicked] = useState(false)

    const childData = findVal(props.item.children, 'data');
    const childRecords = findVal(props.item.children, 'records');
    const currentData = Object.entries(props.item.data)
    
    const hasNemesis = props.item.children.hasOwnProperty('has_nemesis');
    const hasSecrete = props.item.children.hasOwnProperty('has_secrete');

    return(
        <div>
            <div 
                className={`flex ${props.index%2 === 0? 'dark':'light'}`} 
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
                    onClick={()=>props.handleDelete(
                        props.firstParentIndex,
                        props.hasNemesis, 
                        props.hasSecrete, 
                        props.index, 
                        props.parentIndex
                    )}
                />
               
            </div>
            
            {clicked &&
            <>
                {childData &&
                    <div>
                        <Header item={childData} child={true}/>

                        {childRecords.map((item:any, index:number) => (
                                <RowContent 
                                    item={item} 
                                    handleDelete={props.handleDelete}    
                                    firstParentIndex={props.firstParentIndex} 
                                    parentIndex={props.index}
                                    index={index}                
                                    child={true}
                                    hasNemesis={hasNemesis}
                                    hasSecrete={hasSecrete}
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