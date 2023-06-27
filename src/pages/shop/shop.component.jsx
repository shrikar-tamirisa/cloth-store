import React from "react";
import { useState } from "react";
import SHOP_DATA from "./shop.data.js";
import CollectionPreview from "../../components/collection-preview/collection-preview.component.jsx";


function ShopPage(){
    const [obj, changeShopData] = useState({collections : SHOP_DATA});
    return <div className="shop-page">
        {obj.collections.map((unit) => 
        (<CollectionPreview key={unit.id} title={unit.title} items={unit.items}/>))}
    </div>
}

export default ShopPage;