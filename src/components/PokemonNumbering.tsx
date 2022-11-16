import styled from "@emotion/styled";

interface NumberingProps{
    name:string,
    color:string,
    number:number
}

const PokemonNumbering = (props:NumberingProps) => {
    const renderNumber = (id:number) =>{
        const digits = 3;
        const numberString = id.toString()

        // 3자리수 그 이상일 경우
        if(numberString.length >= digits){
            return numberString;
        }
        // 2자리수 이하일 경우
        let result = ''

        for(let i = 0; i<digits-numberString.length; i++){
            result+=0;
        }

        return `${result}${numberString}`
}
  return (
    <Container color={props.color}>
      <div className="poke__numbering">
        <div className="number">
          <span>{renderNumber(props.number)}</span>
        </div>
        <div className="name">
            <span>{props.name}</span>
        </div>
      </div>
    </Container>
  );
};

export default PokemonNumbering;

const Container = styled.div<{ color:string }>`
  display: flex;
  .poke__numbering {
    border: 2px solid #e8e8e8;
    border-radius: 20px;
    
    display: flex;
    .number {
        padding: 3px 9px;
        font-size: 15px;
        font-weight: bold;
        border-radius: 20px;
        background-color: ${props => props.color};
    }
    .name{
        padding:2px 8px;
        font-weight: bold;
    }
  }
`;
