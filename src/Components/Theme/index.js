import Sidebar from '../Sidebar';
import TodosHeader from '../TodosHeader';
import TodosFooter from '../TodosFooter';
import "./index.css"

const Theme = () => {
  return (
    <div>
      <TodosHeader />
      <Sidebar />
      <main className='main-container'>
       
          <h3 className="under-working">
            🚧 I’m working on this feature — it will be live on the website soon!
          </h3>
          <h1>Theme Page</h1>
        
      </main>

      <TodosFooter />
    </div>
  )
}

export default Theme
