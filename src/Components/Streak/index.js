import Sidebar from '../Sidebar';
import TodosHeader from '../TodosHeader';
import TodosFooter from '../TodosFooter';
import { useGetStreakDataQuery } from '../../services/todoService';
import "./index.css"

import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';





const Streak = () => {

  const { data, isFetching, isError, error } = useGetStreakDataQuery({ days: 89 })
  const streakData = data?.streakData || [];
  const summary = data?.summary || []
  const totalTasks = summary.totalTasks
  const completedTasks = summary.completedTasks
  const activeDays = summary.activeDays
  const maxStreak = summary.maxStreak

  return (
    <div>
      <TodosHeader />
      <Sidebar />
      <main className='main-container'>
        {isFetching ? (<div>
          <h1 className='fetch-heading'>We're fetching your data. This might take a little time—thanks for your patience.</h1>
          {[...Array(1)].map((_, i) => (
            <div key={i} className='skeleton'>
              <Skeleton height={330} />
            </div>
          ))}
        </div>) : (
          isError ? (<p className='fetch-heading'>{error}</p>) : (
            <div>
              <div className='streak-data-container'>
                <h1 className='streak-data'>{totalTasks} Tasks in Last 3 Months</h1>
                <h1 className='streak-data'>{completedTasks} Completed Tasks in Last 3 Months</h1>
                <h1 className='streak-data'>Total Active Days: {activeDays}</h1>
                <h1 className='streak-data'>Max Streak: {maxStreak}</h1>
              </div>
              <div className="streak-heatmap-wrapper">
                <CalendarHeatmap
                  startDate={new Date(new Date().setDate(new Date().getDate() - 89))}
                  endDate={new Date()}
                  values={streakData}
                  classForValue={(value) => {
                    if (!value || value.count === 0) return 'color-empty';
                    if (value.count >= 5) return 'color-github-4';
                    if (value.count >= 3) return 'color-github-3';
                    if (value.count >= 1) return 'color-github-2';

                  }}
                  tooltipDataAttrs={(value) => {
                    if (!value?.date || value.count == null) return { 'data-tip': '' };

                    const date = new Date(value.date);
                    const formattedDate = `${date.toLocaleString('en-US', {
                      month: 'short',
                    })},${date.getDate().toString().padStart(2, '0')},${date.getFullYear()}`;

                    return {
                      'data-tip': `${value.count} Task${value.count !== 1 ? 's' : ''} on ${formattedDate}`,
                    };
                  }}


                  gutterSize={2}

                />

                <ReactTooltip place="top" type="dark" effect="solid" />


              </div>

            </div>)
        )}
      </main>

      <TodosFooter />
    </div>
  )
}

export default Streak
