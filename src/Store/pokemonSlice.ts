import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { loadPokemonApi, PokemoListResponseType } from '../Service/pokemonService'



export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async (nextUrl?:string) => {
    const response = await loadPokemonApi(nextUrl) 
    return response
  }
)


interface PokemonState {
  pokemons: PokemoListResponseType;
}

const initialState = {
    pokemons:{
        count:0,
        next:'',
        results:[]
    }
} as PokemonState

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder.addCase(fetchPokemons.fulfilled,(state,action:PayloadAction<PokemoListResponseType>)=>{
      //infinite scroll
      // 기존에 state.pokemons.result값이 존재한다면...
      if(state.pokemons.results.length>0 ){
        state.pokemons ={
          ...action.payload,
          results:[...state.pokemons.results, ...action.payload.results]
        }
      }else{
        state.pokemons = action.payload;
      }
  })}
})


export const pokemonReducer =  pokemonSlice.reducer