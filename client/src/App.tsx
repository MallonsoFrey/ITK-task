import AppRouter from '../routes/Router'
import './styles/App.css'

function App() {

  return (
    <>
      <header className="fixed top-0 flex justify-center m-4">
        <h1>Мой ToDo</h1>
      </header>
      <AppRouter />
    </>
  );
}

export default App
