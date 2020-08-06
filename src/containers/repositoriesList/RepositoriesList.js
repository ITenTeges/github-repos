import React, { Component } from 'react'
import equal from 'fast-deep-equal/react'
import { List, Accordion, Icon, Label, Loader, Segment, Dimmer, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getRepositories } from '../../app/githubSlice'

class RepositoriesList extends Component {
  state = { 
    activeIndex: -1, 
    lastOpened: -1,
    loading: true
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex, lastOpened } = this.state
    const { getRepositories, users } = this.props
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex, loading: true })
    if (newIndex > -1 && newIndex !== lastOpened) {
      getRepositories(users[index].username)
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!equal(prevState.activeIndex, this.state.lastOpened)) {
      this.setState({ loading: false, lastOpened: this.state.activeIndex })
    }
  }

  renderRepositories = () => {
    const { loading } = this.state
    const { repositories } = this.props
    const shouldRenderRepositories = !loading && repositories.length > 0
    const shouldRenderEmpty = !loading && repositories.length === 0
    if (shouldRenderRepositories) {
      return repositories.map(repo => <List.Item key={repo.url} as="a" href={repo.url}>
        <List.Icon name='github' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header>{repo.title}</List.Header>
          <List.Description>{repo.description}</List.Description>
        </List.Content>
        <Label basic image>
          {repo.stars}
          <Icon name="star"/>
        </Label>
      </List.Item>
    )}
    if (shouldRenderEmpty) {
      return <List.Item>No repositories</List.Item>
    }

    return null
  }

  render = () => {
    const { activeIndex, loading } = this.state
    const { users } = this.props
    
    return users.map((user, index) => <Accordion fluid styled key={user.username}>
      <Accordion.Title
        active={activeIndex === index}
        index={index}
        onClick={this.handleClick}
      >
        <Icon name='dropdown' />{user.username}
      </Accordion.Title>
      <Accordion.Content active={activeIndex === index}>
        <List divided relaxed>
        {loading && <Segment>
          <Dimmer active inverted>
            <Loader size='small'>Loading</Loader>
          </Dimmer>

          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>}
        {this.renderRepositories()}
        </List>
      </Accordion.Content>
    </Accordion>
  )}
}

const mapStateToProps = ({ github }) => ({
  users: github.users,
  repositories: github.repositories,
})

const mapDispatchToProps = dispatch => ({
  getRepositories: username => {
    dispatch(getRepositories(username))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesList)