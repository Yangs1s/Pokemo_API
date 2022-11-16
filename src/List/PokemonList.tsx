import styled from '@emotion/styled';
import { useEffect } from 'react';
import PokemonCard from './PokemonCard';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { RootState, useAppDispatch } from '../Store';
import { fetchPokemons } from '../Store/pokemonSlice';
import { useSelector } from 'react-redux';




const PokemonList = () => {
   
    const { pokemons } = useSelector((state:RootState) => state.pokemons)

    const dispatch = useAppDispatch()

    const [pokemonRef] = useInfiniteScroll({
      loading:false,
      hasNextPage:pokemons.next !== '',
      onLoadMore: async ()=>{
        dispatch(fetchPokemons(pokemons.next))
      },
      disabled: false,

      rootMargin: '0px 0px 400px 0px'
    });

    useEffect(()=>{
        dispatch(fetchPokemons())
    },[dispatch])
    
  
    return (
        <>
        <Container>
            <div className="pokemon__grid">
                {
                    pokemons.results.map((item,index)=>{
                        return(
                         <PokemonCard key={`${item.name}_${index}`} name={item.name}/>
                        )
                    })
                }
            </div>
        </Container>
        <Loading ref={pokemonRef}>
                Loading..
        </Loading>
        </>
    );
};

export default PokemonList;

const Loading = styled.div`
    display: flex;
    justify-content: center;
`

const Container = styled.section`
    display: flex;
    .pokemon__grid{
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        display: grid;
        grid-gap: 20px;
        margin: 2em auto;


   
    }

`