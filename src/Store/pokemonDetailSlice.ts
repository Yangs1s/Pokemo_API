import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { loadPokemonDetailApi, PokemonDetailType } from '../Service/pokemonService'
import { RootState } from '.'



export const fetchDetailPokemons = createAsyncThunk(
  'pokemon/fetchDetailPokemons',
  async (name:string) => {
    const response = await loadPokemonDetailApi(name) 
    return response
  }, {
    condition:(name,{getState})=>{
      const { pokemonDetails } = getState() as RootState
      const pokemon = pokemonDetails.pokemonDetails[name]
      return !pokemon;
    }
  }
)


interface PokemonDetailState {
  pokemonDetails: Record<string,PokemonDetailType>;

    // ???? Record ? 
    /*
    * 이게 뭐냐면 카드하나에서 하나씩 관리하는 정보가
    리덕스에서 한꺼번에 똑같이 관리할수 없어서 이런식으로 묶어서 관리하게끔 도식화한것

    pokemonDetails:{
        이상해씨:PokemonDetailType
        꼬부기:PokemonDetailType
        파이리:PokemonDetailType
    }
    */ 
}

const initialState = {
    pokemonDetails:{}
} as  PokemonDetailState

const pokemonDetailSlice = createSlice({
  name: 'pokemonDetail',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder.addCase(fetchDetailPokemons.fulfilled,(state,action:PayloadAction<PokemonDetailType>)=>{
    state.pokemonDetails ={
        ...state.pokemonDetails,
    [action.payload.name]:action.payload
    } 
  })}
})


export const pokemonDetailReducer =  pokemonDetailSlice.reducer