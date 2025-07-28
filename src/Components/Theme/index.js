import Sidebar from '../Sidebar';
import TodosHeader from '../TodosHeader';
import TodosFooter from '../TodosFooter';
import "./index.css"
import { useSelector, useDispatch } from 'react-redux';
import { themes } from "../../themes"
import { MainContainer,FormattedDateHeading,DashboardHeading } from '../../styles';

import { setTheme } from '../../features/themeSlice';

const Theme = () => {
  const dispatch = useDispatch()

  const theme = useSelector(state => state.theme.theme)
  

  const handleThemeChange = (e) => {
    const selectedTheme = Object.values(themes).find(t => t.name === e.target.value);
    dispatch(setTheme(selectedTheme));
  };

  return (
    <div>
      <TodosHeader />
      <Sidebar />
      <MainContainer bg={theme?.main?.bg}>
        <DashboardHeading color={theme?.colors.primary}>
          🎨 Personalize your experience — choose a theme that suits your style.
        </DashboardHeading>
        <h1>Current Theme: <FormattedDateHeading color={theme?.colors.primary}>{theme.name}</FormattedDateHeading></h1>
        <select style={{backgroundColor:"lavender"}} className='dropdown' onChange={handleThemeChange} value={theme?.name} >
          {Object.entries(themes).map(([key, theme]) => (
            <option value={theme.name} key={key}>{theme.name}</option>
          ))}
        </select>


      </MainContainer>

      <TodosFooter />
    </div>
  )
}

export default Theme
