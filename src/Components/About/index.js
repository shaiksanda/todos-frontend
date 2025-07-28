import Sidebar from '../Sidebar';
import TodosHeader from '../TodosHeader';
import TodosFooter from '../TodosFooter';
import "./index.css"
import { MainContainer,BoxContainer,AboutHeading,AboutContent } from '../../styles';
import { useSelector } from 'react-redux';

const About = () => {
  const theme=useSelector(state=>state.theme.theme)
  return (
    <div>
      <TodosHeader />
      <Sidebar />
      <MainContainer bg={theme?.main?.bg}>
        
          <AboutHeading color={theme?.colors.primary}>👋 Hey there! Welcome to Task Manager</AboutHeading>
          <BoxContainer>
            <AboutContent bg={theme?.colors.primary}>Hi! I’m Sanni — the developer of this little tool you’re looking at.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>I built this app because I’ve always struggled to stay organized, and I wanted something simple, clean, and actually motivating to track my tasks.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>Let me walk you through what this app is all about and how you can make the most of it.</AboutContent>
          </BoxContainer>
          <AboutHeading color={theme?.colors.primary} >✨ Why did I build this?</AboutHeading>
          <BoxContainer>
            <AboutContent bg={theme?.colors.primary}>We all have so much to do every day — studies, work, personal stuff — and it’s easy to forget or feel overwhelmed.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>I didn’t want to use a bulky app filled with ads and useless features.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>So I created Task Manager, a minimal yet powerful task manager with a cool dashboard.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>It’s made for real people like you and me — who just want to plan their day and feel accomplished.</AboutContent>
          </BoxContainer>
          <AboutHeading color={theme?.colors.primary} >📋 What can you do here?</AboutHeading>

          <BoxContainer>
            <AboutContent bg={theme?.colors.primary} >Add your tasks with a simple form.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>Mark them as completed once you’re done.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>Delete them if you change your mind.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>And the best part? Check out the dashboard — it shows you how many tasks you’ve created and completed over time, so you can actually see your progress.</AboutContent>
          </BoxContainer>
          <AboutHeading color={theme?.colors.primary} >🚀 How to make the most of it?</AboutHeading>
          <h3>Here’s my advice as someone who uses it every day:</h3>
          <BoxContainer>
            <AboutContent bg={theme?.colors.primary}>🌱 Every morning, open this app and add 3–5 tasks you really want to finish.</AboutContent>
            <AboutContent  bg={theme?.colors.primary}>🎯 Keep it realistic — small wins matter.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>💪 As you complete each one, mark it done and feel that little dopamine kick.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>📊 At the end of the day/week, peek at the dashboard to see how awesome you’ve been.</AboutContent>
          </BoxContainer>
          <AboutHeading  color={theme?.colors.primary}>👨‍💻 Who is this for?</AboutHeading>
          <h3>This app is for you if you:</h3>
          <BoxContainer >
            <AboutContent bg={theme?.colors.primary}>Are a student trying to manage assignments.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>A freelancer juggling clients and deadlines.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>Or just someone who loves staying organized and seeing progress.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>It doesn’t matter who you are — this is your space to focus and get things done.</AboutContent>
          </BoxContainer>

          <AboutHeading style={{ color: "red" }} >⚠️ Important Notice</AboutHeading>
          <BoxContainer >
            <AboutContent bg={theme?.colors.primary}>This app runs on free hosting and database service tiers.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>Sometimes, the server may take a little extra time to “wake up” or fetch your data.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>Please be patient for a few moments if things seem slow — it’ll load soon.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>Thank you for understanding! 🌟</AboutContent>
          </BoxContainer>

          <AboutHeading color={theme?.colors.primary}>💌 Final words from me</AboutHeading>
          <BoxContainer>
            <AboutContent bg={theme?.colors.primary}>I really hope this app helps you as much as it helps me.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>Remember — your goals matter, and you’re capable of more than you think.</AboutContent>
            <AboutContent bg={theme?.colors.primary}>Now go ahead — add your first task, and let’s get started together. 🚀</AboutContent>
          </BoxContainer>

        
      </MainContainer>

      <TodosFooter />
    </div>
  )
}

export default About
