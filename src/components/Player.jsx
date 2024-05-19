import { useState } from "react";

export default function Player({initiaName,symbol,isActive,onChangeName}){
    const [playerName,setPlayerName]=useState(initiaName);
    const [isEditing,setIsEditing] = useState(false)
    function handleEditClick (){
        setIsEditing((editing)=> !editing);
        onChangeName(symbol,playerName);
    }
    function handleChange(event){
        console.log(event);
      if(isEditing){  
        setPlayerName(event.target.value)
    }

    }
    let editablePlayerName=  
    <span className="player-name">{playerName}</span>;
    if(isEditing){
      editablePlayerName= <input type="text" required value={playerName} onChange={handleChange} />
    }
    return(
        <li className={isActive? 'active' : undefined}>
      <span className="player">
       {editablePlayerName}
      <span className="player-symbol">{symbol}</span>
      <button onClick={handleEditClick}>{isEditing ? 'save' : 'edit'}</button>
      </span>
    </li>
    );
}