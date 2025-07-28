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

export const FilterContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.bg};
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
`
export const FormattedDateHeading = styled.span`
color: ${(props) => props.color}
`

export const EachTodo = styled.div`
display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px;
  background-color: ${(props) => props.bg};
  border-radius: 8px;
  cursor: pointer;
  color: #0f172a;
  transition: all 0.5s ease;

  @media (min-height:768px){
  min-height: 35px;
  }
`

export const AllTodo = styled.div`
display: flex;
flex-direction: column;
justify-content:center;
border-radius: 6px;
color:lavender;
background-color: ${props => props.bg}
`

export const FilterHeading = styled.h1`
display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: lavender
`

export const AllTasksHeading = styled.h1`
text-align:center;
font-size:24px;
color: ${props => props.color}
`

export const DashboardHeading = styled.h1`
    font-size: 24px;
    text-align: center;
    color:${props => props.color};
    font-weight: bold;
    margin: 10px 0px;

    @media (min-width:768px){
    font-size: 30px;
    }
`

export const DashboardContent = styled.p`
font-size: 18px;
text-align: center;
font-weight: bold;
color:${props=>props.color};
@media (min-width:768px){
font-size:24px
}
`

export const DashboardGraphContainer=styled.div`
background-color: ${props=>props.bg};
color:${props=>props.color};
display: grid;
cursor: pointer;
grid-template-columns: repeat(1,1fr);
grid-gap: 8px;
padding: 8px;
outline: none;
width: 100%;
border-radius: 8px;
border-width: 0px;
box-sizing: border-box;
margin: 10px 0px;
box-shadow: 0 4px 10px white;

@media (min-width:768px){
grid-template-columns: repeat(2,1fr);
}
`

export const StreakDataHeading=styled.h1`
background-color: ${props=>props.bg};
padding: 6px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 6px;
font-size: 24px;
color:${props=>props.color};
box-shadow:4px 4px 10px white;
font-weight: bold;
@media (min-width:768px){
font-size:30px;
}

`
export const BoxContainer=styled.div`
display: grid;
grid-template-columns: repeat(1,1fr);
grid-gap: 4px;

@media (min-width:768px){
grid-template-columns: repeat(3,1fr);
}
`

export const AboutHeading=styled.h1`
font-size: 24px;
text-align: center;
color:${props=>props.color};
font-weight: bold;
@media (min-width:768px){
font-size: 30px;
}
`

export const AboutContent=styled.h1`
font-size: 16px;
font-weight: 600;
border-radius: 8px;
display: flex;
justify-content: center;
align-items: center;
padding: 8px;
cursor: pointer;
transition:2s all ease;
color: white;
background-color:${props=>props.bg};
@media (min-width:768px){
font-size: 22px;
}
`