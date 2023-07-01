import './styles/Header.css'

interface headerInterface {
  item: any,
  child?: boolean
}

function Header(props:headerInterface) {
    
    const getHeader = (item:any) => {
        const header = Object.entries(item).map(([key]:any) => (
          <div>
            <p>{key}</p>
          </div>
        ))
        
        return header;
    }

    return(
        <div className='flex header'>
            <div></div>
            {getHeader(props.item)}
            <p>Delete?</p>
            
        </div>
    );
}

export default Header;