import React, {useState, useEffect} from "react";
import axios from "axios";
import CardPoke from "../Components/CardPoke"; 
import './Home.scss';

const Home = () => {

    const[listPoke, setListPoke] = useState([]);
    const[limit, setLimit] = useState(20);
    const[offset, setOffset] = useState(20);

    const getPokemon = async() => {

        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        console.log(res.data.results);
        getListPokemon(res.data.results);
        console.log(listPoke);
    }

    const getListPokemon = async(response) => {
        response.map(async(item) => {
            const result = await axios.get(item.url);
            setListPoke(state => {
                state = [...state, result.data];
                return state;
            })
        })
    }

    const loadMoreData = () => {
        setLimit(limit + 20);
        setOffset(offset + 20);
        getPokemon();
    }

    useEffect(() => {
        getPokemon();
    }, [])
    

    return(
        <div className="container">
            <div className="contentCard">
                {/* <div>testing</div>
                <div>testing</div>
                <div>testing</div> */}
                <CardPoke pokeData={listPoke} />
            </div>
            <div className="loadButton" onClick={() => loadMoreData()}>
                <span>Load More Pokemon</span>
            </div>
        </div>
    );
}

export default Home;


// Create pokedex
// https://drive.google.com/file/d/1UR3frgKDBSDO0V6xLksqrUhnSY-cbR4H/view?usp=sharing
// https://pokeapi.co/
// Mandatory feature:
//            1. Infinite scroll
//             2. Show pokemon image and name in infinite scroll
//             3. Show pokemon image(might be multiple image),name, stats,and types on pokemon detail page