import styled from '@emotion/styled';

const PokemonChip = () => {
    return (
        <Container>
            <div className='pokemon_chip'>
            Pokémon
            </div>
        </Container>
    );
};

export default PokemonChip;

const Container = styled.div`
    display: flex;
    margin-top: 25px;

    .pokemon_chip{
        border: 1px solid #000;
        border-radius: 20px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        margin:0px 0 0 auto;
        padding: 1px 10px;
    }
`