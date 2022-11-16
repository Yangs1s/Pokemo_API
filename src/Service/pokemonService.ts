import axios from 'axios'

const remote = axios.create();

export interface PokemoListResponseType{
    count:number,
    next:string,
    results:{
        name:string,
        url:string
    }[]
}


export const loadPokemonApi =async (nextUrl?:string) => {
    const requestUrl = nextUrl ? nextUrl : 'https://pokeapi.co/api/v2/pokemon'

    const response = await remote.get<PokemoListResponseType>(requestUrl)
    return response.data;


}

export interface PokemonDetailResponseType{
    id:number,
    name:string,
    weight:number,
    height:number,
    types:{
        type:{
            name:string
        }
    }[]
    sprites:{
        front_default:string,
        other:{
            dream_world:{
                front_default:string
            }
            'official-artwork':{
                front_default:string
            }
        }
    }
    stats:{
        base_stat:number,
        stat:{
            name:string
        }
    }[]
}
export interface PokemonSpeciesType{
    color:{
        name:string;
    },

    names:{
        language:{
            name:string
        }
        name:string,
    }[]
}
export interface PokemonDetailType{
    id:number,
    name:string,
    weight:number,
    height:number,
    types:string[],
    japanName:string,
    color:string,
    images:{
        frontDefault:string,
        dreamWorld:string,
        officialArtWork:string
    }

    baseStats:{
        name:string,
        value:number
    }[]
}

export const loadPokemonDetailApi = async(name:string):Promise<PokemonDetailType> =>{
    const detailUrl = `https://pokeapi.co/api/v2/pokemon/${name}`
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`

    const response = await remote.get<PokemonDetailResponseType>(detailUrl)
    const response1 = await remote.get<PokemonSpeciesType>(speciesUrl)
    const species = response1.data
    const detail = response.data;
    const japanName = species.names.find(item=>item.language.name === 'ja-Hrkt')?.name ?? detail.name;
    
    return {
        id:detail.id,
        name:detail.name,
        weight:detail.weight/10,
        height:detail.height/10,
        types:detail.types.map((item) => item.type.name),
        color:species.color.name,
        japanName:japanName,
        images:{
            frontDefault:detail.sprites.front_default,
            dreamWorld:detail.sprites.other.dream_world.front_default,
            officialArtWork:detail.sprites.other['official-artwork'].front_default
        },
        baseStats:detail.stats.map(item => {
            // api 내용에 배열로 표시 되있으니
            return{
                name:item.stat.name,
                value:item.base_stat
            }
        })
    }
}