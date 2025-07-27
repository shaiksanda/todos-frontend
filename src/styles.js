import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    z-index: 100;
    padding: 10px;
    color: ${(props) => props.color};
    background-color: ${(props) => props.bg};
`

export const HeaderButton = styled.button`
    height: 50px;
    width: 120px;
    border: none;
    border-radius: 8px;
    background-color: ${(props) => props.bg};
    cursor: pointer;
    color: ${(props) => props.color};
    font-size: 16px;
    font-weight: 600;
    font-weight: bold;
    display: block;
     @media (max-width: 768px) {
    display: none
  }

`

export const SidebarContainer = styled.div`
    position: fixed;
    top: 80px;
    left: 0;
    width: 250px;
    height: calc(100vh - 80px);
    background-color: ${(props) => props.bg};
    color: black;
    overflow-y: auto;
    padding: 10px;
    scrollbar-width: none;
    display: none;
    @media (min-width:768px){
    display: block
    }
`

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  background-color: ${(props) => (props.selected ? "white" : 'transparent')};
  color: ${(props) => (props.selected ? props.selectedColor : "")};

`;

export const MainContainer = styled.div`
 position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  scrollbar-width: none;
  padding: 10px;
  margin-bottom: 80px;
  background-color: ${(props) => props.bg};

  @media (min-width:768px){
  left: 250px;
  margin-bottom: 0px;
    }
`

export const FilterContainer=styled.div`
  width: 100%;
  background-color: ${(props)=>props.bg};
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
`
export const FormattedDateHeading=styled.span`
color: ${(props)=>props.color}
`

export const EachTodo=styled.div`
display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px;
  background-color: ${(props)=>props.bg};
  border-radius: 8px;
  cursor: pointer;
  color: #0f172a;
  transition: all 0.5s ease;

  @media (min-height:768px){
  min-height: 35px;
  }
`

export const AllTodo=styled.div`
display: flex;
flex-direction: column;
justify-content:center;
background-color: ${(props)=>props.bg}
`