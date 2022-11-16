import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useIntersectionObserver } from 'react-intersection-observer-hook';
import PokemonChip from '../components/PokemonChip';
import PokemonNumbering from '../components/PokemonNumbering';
import { PokemonSkeleton } from '../components/PokemonSkelton';
import { RootState, useAppDispatch } from '../Store';
import { useSelector } from 'react-redux';
import { fetchDetailPokemons } from '../Store/pokemonDetailSlice';

interface PokemonCardType{
    name:string,
}

const PokemonCard = (props:PokemonCardType) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const imageType = useSelector((state:RootState) => state.imageType.type)
    
    const { pokemonDetails } = useSelector((state:RootState) => state.pokemonDetails)
    const pokemons = pokemonDetails[props.name]


    const [ref, { entry }] = useIntersectionObserver();
    const isVisible = entry && entry.isIntersecting; // 지나간 포케몬 데이터는 더이상 읽지 않는다. 그래서 데이터 호출할때 낭비하는것을 줄여줌

    const handleClick = () =>{
        navigate(`pokemon/${props.name}`)
    }
    useEffect(()=>{
        if(!isVisible){
            return;
        }
        dispatch(fetchDetailPokemons(props.name))
    },[dispatch,props.name,isVisible])

    if(!pokemons){
        return (
        <Container color={'#fff'} ref={ref}>
            <PokemonNumbering name={'POKEMON'} color={'#5e6efe'} number={0}/>
            <div className="item__image">
               <PokemonSkeleton/>
            </div>
            <div className="pokemon__chip_area">
                <PokemonChip/>
            </div>
        </Container>
        )
    }
    return (
        <Container onClick ={handleClick} color={String(pokemons?.color)}>
                <PokemonNumbering name={pokemons.japanName} color={pokemons.color} number={pokemons.id}/>
                <div className="item__image">
                    <img src={pokemons.images[imageType]} alt="포켓몬 이미지" />
                </div>
                <div className="pokemon__chip_area">
                    <PokemonChip/>
                </div>
        </Container>
    );
};

export default PokemonCard;

const Container = styled.div<{color:string}>`
    height: 300px;
    width: 250px;
    display: flex;
    flex-direction: column;
    cursor:pointer;
    margin-top: 10px;
    padding: 16px;

    box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
    border: 1px solid #e9e9e9;
    transition: all 0.3s ease-in-out;

    &:hover{
        transform: scale(1.1);
        }
    &:active{
        background-color: ${props => props.color};
        opacity: 0.8;
        transition: background-color 0s;
    }
    .item__image{
        width: 180px;
        height: 180px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1 1 auto;
        margin: 8px 36px;
        img{
            display: flex;
            width: 100%;
            height: 100%;
            }
        }
    .pokemon__chip_area{
        
    }
`