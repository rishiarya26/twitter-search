import React from 'react';

const Tabs = ({ items, selectedIndex = 0, onTabChange }) => {
    const onTabClick = (selected)=>{
        onTabChange(selected);
    }
  return (
    <div className="tab">
      { items?.display.map((data, id) => (
               <div
               key={id}
               id={id}
               onClick={()=>onTabClick(id)}
               className={ id === selectedIndex 
              ? 'tab-con-active'
              : ' tab-con'}
          >
            <span className={
                id === selectedIndex ? 'text' : 'text'}>{data}</span>
          </div>
      )) }
    </div>
  );
};

export default Tabs;
