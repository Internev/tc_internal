import React from 'react'
import { Card, Comment } from 'semantic-ui-react'
import moment from 'moment'

const CommentHistory = ({dog}) => (
  <Card>
    <Card.Content header={dog.name} />
    <Card.Content meta={`Last Updated: ${moment(dog.updatedAt).format('MMMM Do YYYY')}`} />
    <Card.Content>
      <Comment.Group>
        {dog.comments.map((comment, i) => (
          <Comment>
            <Comment.Content>
              <Comment.Author>{comment.name}</Comment.Author>
              <Comment.Text>{comment.msg}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    </Card.Content>
  </Card>
)
export default CommentHistory
