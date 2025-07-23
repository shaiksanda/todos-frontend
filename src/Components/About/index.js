import Sidebar from '../Sidebar';
import TodosHeader from '../TodosHeader';
import TodosFooter from '../TodosFooter';
import "./index.css"

const About = () => {
  return (
    <div>
      <TodosHeader />
      <Sidebar />
      <main className='main-container'>
        <div className='dashboard-container'>
          <h1 style={{ color: "magenta" }} className='about-heading'>👋 Hey there! Welcome to Task Manager</h1>
          <div className='box-container'>
            <p className='about-content bg-lavender'>Hi! I’m Sanni — the developer of this little tool you’re looking at.</p>
            <p className='about-content bg-lavender'>I built this app because I’ve always struggled to stay organized, and I wanted something simple, clean, and actually motivating to track my tasks.</p>
            <p className='about-content bg-lavender'>Let me walk you through what this app is all about and how you can make the most of it.</p>
          </div>
          <h1 style={{ color: "orange" }} className='about-heading'>✨ Why did I build this?</h1>
          <div className='box-container'>
            <p className='about-content bg-lavender'>We all have so much to do every day — studies, work, personal stuff — and it’s easy to forget or feel overwhelmed.</p>
            <p className='about-content bg-lavender'>I didn’t want to use a bulky app filled with ads and useless features.</p>
            <p className='about-content bg-lavender'>So I created Task Manager, a minimal yet powerful task manager with a cool dashboard.</p>
            <p className='about-content bg-lavender'>It’s made for real people like you and me — who just want to plan their day and feel accomplished.</p>
          </div>
          <h1 style={{ color: "magenta" }} className='about-heading'>📋 What can you do here?</h1>

          <div className='box-container'>
            <p className='about-content bg-lavender' >Add your tasks with a simple form.</p>
            <p className='about-content bg-lavender'>Mark them as completed once you’re done.</p>
            <p className='about-content bg-lavender'>Delete them if you change your mind.</p>
            <p className='about-content bg-lavender'>And the best part? Check out the dashboard — it shows you how many tasks you’ve created and completed over time, so you can actually see your progress.</p>
          </div>
          <h1 style={{ color: "orange" }} className='about-heading'>🚀 How to make the most of it?</h1>
          <h3>Here’s my advice as someone who uses it every day:</h3>
          <div className='box-container'>
            <p className='about-content bg-lavender'>🌱 Every morning, open this app and add 3–5 tasks you really want to finish.</p>
            <p className='about-content bg-lavender' >🎯 Keep it realistic — small wins matter.</p>
            <p className='about-content bg-lavender'>💪 As you complete each one, mark it done and feel that little dopamine kick.</p>
            <p className='about-content bg-lavender'>📊 At the end of the day/week, peek at the dashboard to see how awesome you’ve been.</p>
          </div>
          <h1 style={{ color: "magenta" }} className='about-heading'>👨‍💻 Who is this for?</h1>
          <h3>This app is for you if you:</h3>
          <div className='box-container'>
            <p className='about-content bg-lavender'>Are a student trying to manage assignments.</p>
            <p className='about-content bg-lavender'>A freelancer juggling clients and deadlines.</p>
            <p className='about-content bg-lavender'>Or just someone who loves staying organized and seeing progress.</p>
            <p className='about-content bg-lavender'>It doesn’t matter who you are — this is your space to focus and get things done.</p>
          </div>

          <h1 style={{ color: "red" }} className='about-heading'>⚠️ Important Notice</h1>
          <div className='box-container'>
            <p className='about-content bg-lavender'>This app runs on free hosting and database service tiers.</p>
            <p className='about-content bg-lavender'>Sometimes, the server may take a little extra time to “wake up” or fetch your data.</p>
            <p className='about-content bg-lavender'>Please be patient for a few moments if things seem slow — it’ll load soon.</p>
            <p className='about-content bg-lavender'>Thank you for understanding! 🌟</p>
          </div>

          <h1 style={{ color: "orange" }} className='about-heading'>💌 Final words from me</h1>
          <div className='box-container'>
            <p className='about-content bg-lavender'>I really hope this app helps you as much as it helps me.</p>
            <p className='about-content bg-lavender'>Remember — your goals matter, and you’re capable of more than you think.</p>
            <p className='about-content bg-lavender'>Now go ahead — add your first task, and let’s get started together. 🚀</p>
          </div>

        </div>
      </main>

      <TodosFooter />
    </div>
  )
}

export default About
