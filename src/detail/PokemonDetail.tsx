import styled from "@emotion/styled";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PokemonChip from "../components/PokemonChip";
import { PokemonSkeleton } from "../components/PokemonSkelton";
import { RootState, useAppDispatch } from "../Store";
import { fetchDetailPokemons } from "../Store/pokemonDetailSlice";

const PokemonDetail = () => {
    const { name } = useParams();
    const imageType = useSelector((state:RootState) => state.imageType.type)
    const { pokemonDetails } = useSelector((state:RootState) => state.pokemonDetails)
    const dispatch = useAppDispatch();

    
    const pokemon = name ? pokemonDetails[name]:null
    useEffect(()=>{
        if(!name){
            return ;
        }

        dispatch(fetchDetailPokemons(name))
    },[dispatch,name])

    if(!name || !pokemon){
        return (
        <Container>
            <div className="pokemon__image">
                <PokemonSkeleton/>
            </div>
            <Divider />
            <footer className="pokemon__detail__footer">
                <PokemonChip/>
            </footer>
        </Container>
        )
    }
    console.log(pokemon)
    return (
        <Container>
        <div className="pokemon__image">
            <img
            src={pokemon.images[imageType]}
            alt={pokemon.name}
            />
        </div>
        <Divider />
        <div className="pokemon__info_stat">
            <h2 className="title">기본정보</h2>
            <table className="info">
            <tbody className="tbody_info">
                <tr>
                    <th>번호</th>
                    <td>{pokemon?.id}</td>
                </tr>
                <tr>
                    <th>이름</th>
                    <td>{`${pokemon.japanName}(${pokemon.name})`}</td>
                </tr>
                <tr>
                    <th>타입</th>
                    <td>{pokemon.types.toString()}</td>
                </tr>
                <tr>
                    <th>키</th>
                    <td>{pokemon?.height}</td>
                </tr>
                <tr>
                    <th>몸무게</th>
                    <td>{pokemon?.weight}</td>
                </tr>
            </tbody>
            </table>
            <h2 className="title">능력치</h2>
            <table className="stat">
            <tbody className="tbody_stat">
                {
                    pokemon.baseStats.map((stat)=>{
                        return(
                            <tr key={stat.name}>
                                <th>{stat.name}</th>
                                <td>{stat.value}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
        </div>
        <footer className="pokemon__detail__footer">
                <PokemonChip/>
        </footer>
    </Container>
  );
};

export default PokemonDetail;

const Container = styled.section`
    display: flex;
    border: 2px solid #a0a0a0;
    border-radius: 20px;
    flex-direction: column;
    margin: 2rem 32px;
    padding: 30px;
    justify-content: center;
    .pokemon__image{
        display: flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        margin: 8px;
        img{
            width: 350px;
            height: 350px;
        }
    }
    .pokemon__info_stat {
        table {
            width: 100%;
            margin: 0 auto 16px;
            border-collapse: collapse;
            border-spacing: 0;
            tbody {
                tr {
                padding: 10px;
                border-width: 1px 0;
                border-style: solid;
                border-color: #f0f0f0;
                    th{
                        padding: 6px 12px;
                        width: 1px;
                        white-space: nowrap;
                        text-align: left;
                        font-weight: normal;
                        font-size: 14px;
                        color:#a0a0a0;
                    }
                }
            }
        }
    }
    `;

    const Divider = styled.hr`
    margin: 32px;
    border-style: none;
    border-top: 1px dashed #d3d3d3;
    `;
