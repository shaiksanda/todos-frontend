import Sidebar from '../Sidebar';
import TodosHeader from '../TodosHeader';
import TodosFooter from '../TodosFooter';
import "./index.css"

const Streak = () => {
  return (
    <div>
      <TodosHeader />
      <Sidebar />
      <main className='main-container'>
        <div className='dashboard-container'>
          <h3 className="under-working">
            🚧 I’m working on this feature — it will be live on the website soon!
          </h3>
          <h1>Streak Page</h1>
        </div>
      </main>

      <TodosFooter />
    </div>
  )
}

export default Streak
