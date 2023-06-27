import React from "react";
import "./collection-preview.styles.scss";
import CollectionItem from "../collection-item/collection-item.component";

function CollectionPreview(props){
    return <div className="collection-preview">
        <h1 className="title">{props.title.toUpperCase()}</h1> 
        <div className="preview">
            {props.items.filter((unit, idx) => idx < 4).map((unit) => 
                <CollectionItem id={unit.id} name={unit.name} price={unit.price} imageUrl={unit.imageUrl}/>)}
        </div>
    </div>
}

export default CollectionPreview;
