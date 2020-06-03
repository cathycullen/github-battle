import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle} from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
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
  return (
    <ul className='grid space-around'>
      {repos.map( (repo, index) => {
        const { name, html_url, owner, stargazers_count, forks, open_issues } = repo
        const {login, avatar_url} = owner

        return (
          <li key = {html_url} className = 'card bg-light '>
            <Card
              header={index+1}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className='card-list'>
                <li>
                  <FaUser color='rgb(255,191,116)' size={22}/>
                  <a href={`https://github.com/${login}`} >
                    {login}
                  </a>
                </li>
                <li>
                  <FaStar color='rgb(255,215,0)' size={22}/>
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color='rgb(129,195,245)' size={22}/>
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color='rgb(241,138,147)' size={22}/>
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </Card>
          </li>
        )
      })}
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
          setState({error: `There was an error fetching repositories`})
        })


      // fetchPopularRepos(selectedLanguage)
      //   .then( (repos) => this.setState({
      //     repos,
      //     error: null
      //   }))
        .catch(() => {
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
    // because repos is an object, we can't just put on the screen
    return (
      <React.Fragment>
        <LanguagesNav
          selected = {selectedLanguage}
          onUpdateLanguage = {this.updateLanguage}
        />
      {this.isLoading() && <Loading text='Fetching Repos'/>}

      {error && <p className='center-text error'>ERROR</p>}


      {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
      </React.Fragment>
    )
  }
}
