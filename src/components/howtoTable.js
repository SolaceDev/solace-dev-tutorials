import React from "react"
import Table from 'react-bootstrap/Table'

const HowtoTable = (props) => {
  let howtos = props.howtos
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {howtos.map(({ node }) => (
          <tr>
            <td><a href={node.link} target="_blank" rel="noopener noreferrer">{node.title}</a></td>
            <td>{node.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
export default HowtoTable
