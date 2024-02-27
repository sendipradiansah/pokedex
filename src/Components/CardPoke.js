import React from "react";
import './CardPoke.scss';
import { Link } from "react-router-dom";
import { formatNumber } from "../Helper/Helper";

const colorType = (name) => {
    let color = '{{backgroundColor: "blue"}}';
    switch(name){
        case "fire":
            color = "orange";
        break;
        case "grass":
            color = "green";
        break;
        case "poison":
            color = "purple";
        break;
        case "water":
            color = "blue";
        break;
        case "flying":
            color = "orange";
        break;
        case "bug":
            color = "#990000"
        break;
        default: 
            color = "grey";
    }
    return color;
}

const CardPoke = ({pokeData}) => {
    console.log(pokeData);
    
    return(
        <>
            {
                pokeData.map((item, index) => {
                    return(
                            <Link to={`/detail/${item.id}`} style={{color: "#000000", textDecoration: "none"}}>
                            <div className="cardBox">
                                <div className="imageContent">
                                    <img src={item.sprites.front_default} width="200px" height="210px"></img>
                                </div>
                                <div style={{color: "grey", fontSize: "12px", marginBottom: "10px", fontWeight: "bold"}}>{formatNumber(item.id, 4)}</div>
                                <div style={{color:"#1c1b1b", fontSize: "25px", marginBottom: "10px", fontWeight: "600"}}>{item.species.name.charAt(0).toUpperCase()}{item.species.name.slice(1)}</div>
                                <div className="typeContent">
                                {
                                    item.types.length > 0 ?
                                    item.types.map((item) => {
                                        return(
                                                <div className="type" style={{backgroundColor: colorType(item.type.name)}}>
                                                    {item.type.name.charAt(0).toUpperCase()}{item.type.name.slice(1)}
                                                </div>
                                        )
                                    })
                                    : 
                                    null
                                }
                                </div>
                            </div>
                            </Link>
                    )
                })
            }
        </>
    )
}

export default CardPoke;