import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './Detail.scss';
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

const Detail = () => {
    const[detail, setDetail] = useState([]);
    const { id } = useParams();

    console.log('ID', id);

    // useEffect(() => { axios.get(`https://pokeapi.co/api/v2/pokemon/`,
    //     {
    //         params: {
    //             id: id
    //         }
    //     })
    //     .then((res) => {
    //         console.log(res.data);
    //         setDetail(res.data);
    //     })
    // },[id])
    
    // console.log(detail)
    useEffect(() => {
        if(id){
            axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => {
                console.log('DETAIL', res.data);
                setDetail(state => {state = [...state, res.data]; return state;});
            })
            .catch((err) => {
                console.log(err);
            })
            }
        }, [id]);
        
        console.log('DETAIL SETT', detail);

    

    return(
        <>
        {detail.map((item, index) => {
            return(
                <div className="container">
                <div className="header">
                    {item.name.charAt(0).toUpperCase()}{item.name.slice(1)} {formatNumber(item.id, 4)}
                </div>
                <div className="body">
                    <div className="imageContent">
                        <img src={item.sprites.front_default}></img>
                    </div>
                    <div className="desc">
                        <div className="boxInfo">
                            <div className="left">
                                <div style={{fontSize: "14px", color: "white"}}>Height</div>
                                <div style={{fontSize: "16x", color: "black"}}>{item.height}"</div>
                                <div style={{fontSize: "14px", color: "white"}}>Weight</div>
                                <div style={{fontSize: "16px", color: "black"}}>{item.weight} lbs</div>
                            </div>
                            <div className="right">
                                <div style={{fontSize: "14px", color: "white"}}>Abilities</div>
                                {
                                    item.abilities.map((item) => {
                                        return(
                                            <div style={{fontSize: "14px", color: "black"}}>{item.ability.name.charAt(0).toUpperCase()}{item.ability.name.slice(1)}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div>Type</div>
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
                </div>
            </div>
            )
        })}
       
        </>
    )
}

export default Detail;