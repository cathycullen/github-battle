import React from 'react'

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
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
    return (
      <ul className='flex-center'>
        {languages.map((language) => (
          <li key={language}>
          <button
            className='btn-clear nav-link'
            style={language === this.state.selectedLanguage ? {color: 'red'} : null }
            // need to pass function definition not function invocation
            // so this.updateLanguage(language)  needs to be: () => this.updateLanguage(language)
            // whenever the button is clickec on go ahead and invoke the function we gave you
            onClick={() => this.updateLanguage(language)} >
            {language}
          </button>
          </li>
        ))}
      </ul>
    )
  }
}
