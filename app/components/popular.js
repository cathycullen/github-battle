import React from 'react'
import PropTypes from 'prop-types'

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
      selectedLanguage: 'All'
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }

  updateLanguage(language) {
    console.log(language)
    this.setState(
      {
        selectedLanguage: language
      }
    )
  }
  render() {
    // const selected = this.state.selectedLanguage
    // let's use destructuring instead
    const {selectedLanguage} = this.state
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
    return (
      <React.Fragment>
        <LanguagesNav
          selected = {selectedLanguage}
          onUpdateLanguage = {this.updateLanguage}
        />
      </React.Fragment>
    )
  }
}
