import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

// extract render() nav to it's own functional component

function LanguagesNav({selected, onUpdateLanguage}) {
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
  return (
    <ul className='flex-center'>
      {languages.map((language) => (
        <li key={language}>
        <button
          className='btn-clear nav-link'
          style={language === selected ? {color: 'red'} : null }
          onClick={() => onUpdateLanguage(language)} >
          {language}
        </button>
        </li>
      ))}
    </ul>
  )
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: null,
      error: null,
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(selectedLanguage) {
    console.log(selectedLanguage)
    this.setState(
      {
        selectedLanguage: selectedLanguage,
        error: null,
        repos: null
      }
    )

    fetchPopularRepos(selectedLanguage)
      .then( (repos) => this.setState({
        repos,
        error: null
      }))
      .catch(() => {
        console.log(`Catch: `, this)
        setState({error: `There was an error fetching repositories`})
      })
  }
  isLoading() {
    return this.state.repos === null && this.state.error === null
  }
  render() {
    // const selected = this.state.selectedLanguage
    // let's use destructuring instead
    const {selectedLanguage, repos, error} = this.state
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
    console.log('repos: ', this.state.repos)
    // because repos is an object, we can't just put on the screen
    return (
      <React.Fragment>
        <LanguagesNav
          selected = {selectedLanguage}
          onUpdateLanguage = {this.updateLanguage}
        />
      {this.isLoading() && <p>LOADING</p>}

      {error && <p>ERROR</p>}


      {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
      </React.Fragment>
    )
  }
}
