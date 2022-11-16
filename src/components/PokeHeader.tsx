import styled from '@emotion/styled';
import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { POKEMON_IMAGE_TYPE } from '../Constants';
import { RootState, useAppDispatch } from '../Store';
import { changeImageType, PokemonImageKeyType } from '../Store/ImageTypeSlice';

const PokeHeader = () => {
    const dispatch = useAppDispatch()
    const type = useSelector((state:RootState) => state.imageType.type)


    const handleChange = (e:ChangeEvent<HTMLSelectElement>) =>{
        dispatch(changeImageType({
            type:e.target.value as PokemonImageKeyType
       }))
    }



    return (
        <Header>
            <div className="title">
                <div className="title__logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" alt="pokemonLogo" />
                </div>
            </div>
            <div className="select_area">
                <select value={type} onChange={handleChange} className="select_bar">
                    <option value={POKEMON_IMAGE_TYPE.FRONT_DEFAULT}>Front_Default</option>
                    <option value={POKEMON_IMAGE_TYPE.DREAM_WORLD}>Dream_World</option>
                    <option value={POKEMON_IMAGE_TYPE.OFFICIAL_ART_WORK}>Official_Art_Work</option>
                </select>
            </div>
        </Header>
    );
};

export default PokeHeader;

const Header = styled.header`
    display: flex;
    align-items: center;
    padding:16px 32px;
    border-bottom:1px solid #e8e8e8;
    .title{
        .title__logo{
            margin: 0;
            img{
                width: 200px;
                height: 80px;
            }
        }
    }
    .select_area{
        margin-left:auto;
        display: flex;
        width: 120px;
        .select_bar{
            display: flex;
            flex: 1;
            border-radius: 10px;
            padding: 0.8rem 12px;
        }
    }
`