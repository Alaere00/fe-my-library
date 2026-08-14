import * as React from 'react'
import SearchBoxComponent from '../components/SearchBox/SearchBox'

function App() {
  // const [search, setSearch] = React.useState('')
  // const [data, setData] = React.useState()
  // const [loading, setLoading] = React.useState()
  // const [error, setError] = React.useState()

  // useEffect(() => {
  //   const getBooks = async () => {
  //     setLoading(true)
  //     setError(false)

  //     try {
  //       const response = await fetch() 
  //       if (!response.ok){
  //         console.error("something is broken")
  //       }

                
  //     } catch {
        
  //     }
  //   }



  // }, [])



  return (
    <>
    <p color='black'>Search</p>
    <SearchBoxComponent></SearchBoxComponent>
    </>
  )
}

export default App
