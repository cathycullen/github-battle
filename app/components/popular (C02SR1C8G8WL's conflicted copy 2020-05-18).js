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

function ReposGrid({repos}) {
  debugger
  return (
    <ul className='grid space-around'>
    {repos.map( (repo, index) => {
      const { name, owner, stargazers_count, forks, open_issues } = repo
      const {login, avatar_url} = owner
    return (
      <li key = {name}>{name} className = 'repo bg-light'</li>}
      <h4 className= 'header-lg'>{name}</h4.
    )
  })}nam
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: {},
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
        error: null
      }
    )
    if(!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then( (data) => {
          // react will invoke this with the current state we will destructure repos.
          // and then we will merge the data we got back with repos.
          this.setState(({repos}) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
            }
          }))
        })
        .catch(() => {
          console.log(`Catch: `, this)
          setState({error: `There was an error fetching repositories`})
        })


      // fetchPopularRepos(selectedLanguage)
      //   .then( (repos) => this.setState({
      //     repos,
      //     error: null
      //   }))
        .catch(() => {
          console.log(`Catch: `, this)
          setState({error: `There was an error fetching repositories`})
        })
    }
  }
  isLoading() {
    const { selectedLanguage, repos, error} = this.state
    return !repos[selectedLanguage]
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


      {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
      </React.Fragment>
    )
  }
}
